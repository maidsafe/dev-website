# SAFE .NET Desktop App Tutorial

This tutorial shows you how to create a [.NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/) Windows console application for the SAFE Network.

## Tutorial video
<a href="/video#dotnet">
<img src="https://i.postimg.cc/C1HQkqnY/Tutorial-Dotnet.png" alt=".Net Tutorial - Microsoft Visual Studio" style="width: 100%;"/>
</a>


The .NET Framework is a development platform for building apps for web, Windows, Windows Phone, Windows Server and Microsoft Azure using C#, Visual Basic and F#. This tutorial can also be used for developing [.NET Core](https://github.com/dotnet/core) apps.

You can download working example code from [GitHub](https://github.com/maidsafe/safe-getting-started-dotnet/tree/master/DesktopExample). Follow the steps described in this tutorial to create an app for SAFE Network.

## Prerequisites

Before you start developing your first SAFE app, make sure you have the following installed:

- **Git**
<br />
To fetch the boilerplate code and for version control.

- **Visual Studio**
<br />
[Download and install Visual Studio](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/installation) (any edition) for your operating system with `.NET desktop development` workload.

- **The SAFE Browser**
<br />
To connect to the SAFE Network, applications are required to authenticate with the Authenticator. The Authenticator is bundled with the SAFE Browser and download links can be found from the [SAFE Browser GitHub releases page](https://github.com/maidsafe/safe_browser/releases/latest).

    **Note:**
    * It's recommended to use the latest available version for your platform.
    * Packages for connecting to the live and mock networks are available. This tutorial guides you through both.


## Setup the basic skeleton

The basic setup of the application is available in a git repository. Let's get started by cloning this repository

```bash
git clone https://github.com/maidsafe/safe-getting-started-dotnet
cd safe-getting-started-dotnet
git checkout boilerplate
```
Open the `DesktopExample/SafeDesktopExample.sln` solution in Visual Studio and restore NuGet packages. In solution explorer right click on MockNetworkExample project and click on `Set as StartUp project` option.

**Note:**
  * The CPU architecture is set to **x64** in project build configuration (SAFE APIs support only x64 architecture for desktops)
  * We use the latest version of [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) package using NuGet package manager to use the SAFE API which connect and interact with the SAFE Network.
  * See the [API documentation](https://docs.maidsafe.net/safe_app_csharp/api/safeapp) for the C# SAFEApp library.

## Connecting to the mock network

We provide the `mock` feature with the SAFE API for a faster app development experience and a safe space to perform test operations.

When the `mock` feature is used, a local MockVault file is generated which simulates the network operations used to store and retrieve data. The app will then interface with this file rather than the live SAFE Network.

Use either of the following methods to set up and use the mock network based on your requirements:
- **Mock SAFE browser**: Authentication using the mock SAFE browser.
- **Mock Authenticator API**: Authenticate using the Authenticator class shipped in MaidSafe.SafeApp package. This method is helpful while working with tests.

## Using the mock SAFE browser
**1. Download the mock SAFE browser**

Download the mock SAFE Browser as indicated by the file name `safe-browser-<version>-<platform>-dev.zip` (see [prerequisites](#prerequisites) for instructions).

**2. Add mock flag**

In the solution explorer right click on the `MockNetworkExample` project and navigate to **Properties > Build > Conditional compilation symbols**, add `SAFE_APP_MOCK` flag in your project.

Once this flag is set, a reference to SafeApp.MockAuthBindings.dll will be added into the project automatically which has additional classes and functions used for mock authentication.

**3. Log in**

Create an account on the mock SAFE browser and log in (use any random arbitrary string for the invite token field).

Keep the browser open and logged into this account before proceeding with next steps.

**4. Generate an `AuthReq`**

Let us implement an `AuthReq` instance in the `GenerateEncodedAppRequestAsync()` function in the `Helpers` class:
```csharp
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo
    {
        Id = ConsoleAppConstants.AppId,
        Scope = string.Empty,
        Name = ConsoleAppConstants.AppName,
        Vendor = ConsoleAppConstants.Vendor
    },
    Containers = new List<ContainerPermissions>()
};
```
Make sure the function returns the encoded authRequest:
```csharp
return await Session.EncodeAuthReqAsync(authReq);
```
***Note:** Passing a list of `ContainerPermissions` allows the definition of various permissions provided to specific containers.*

Once the authorisation request is received, the Authenticator sends an authorisation response using the system URI mechanism. The system matches the URI scheme to the application and launches the application passing the URI as an argument.

Check the `Helpers` class in example code to understand how you can register a custom URI scheme for an application.

**5. Send `AuthReq` to the Authenticator**

Once the `AuthReq` instance is initialised it is then used to generate the authorisation request and send it to the Authenticator using the following code, let us implement this in the `AuthenticationWithBrowserAsync()` function present in the `Authentication` class:

```csharp
var encodedReq = await Helpers.GenerateEncodedAppRequestAsync();
var url = Helpers.UrlFormat(encodedReq.Item2, true);
System.Diagnostics.Process.Start(url);
```
<br />
**6. Grant access**

The Safe Browser intercepts the authorisation request and a pop-up dialog prompts for access (Allow or Deny). The Authenticator then sends the response back to the application.

**Note:** The demo application already has the code to send a response from the new instance to the already running console app instance using [IPC Pipes](https://docs.microsoft.com/en-us/dotnet/standard/io/pipe-operations).

Once a response is received, it is decoded and checked whether the request was granted or denied. If the request was granted a new session is initialised to communicate with the SAFE Network, let us implement this in the `ProcessAuthenticationResponse(string authResponse)` function present in the `Authentication` class:
```csharp
var encodedRequest = Helpers.GetRequestData(authResponse);
var decodeResult = await Session.DecodeIpcMessageAsync(encodedRequest);
if (decodeResult.GetType() == typeof(AuthIpcMsg))
{
    var ipcMsg = decodeResult as AuthIpcMsg;

    // Create session object
    if (ipcMsg != null)
    {
        // Initialise a new session
        var session = await Session.AppRegisteredAsync(ConsoleAppConstants.AppId, ipcMsg.AuthGranted);
        DataOperations.InitialiseSession(session);
    }
}
else
{
    Console.WriteLine("Auth Request is not Granted");
    throw new Exception("Auth Request not granted.");
}
```
***Note:** If you are authenticating using the SAFE Browser mock you can skip the next section and move on to [create mutable data](#create-mutable-data).*

## Using mock Authenticator API
You can perform authentication within the application itself for easier testing during development.

**1. Add mock flag**

In the solution explorer right click on the `MockNetworkExample` project and navigate to **Properties > Build > Conditional compilation symbols**, add `SAFE_APP_MOCK` flag in your project.

Once this flag is set, a reference to *SafeApp.MockAuthBindings.dll* will be added into the project automatically which has additional classes and functions used for mock authentication.

**2. Create a mock account**

Use create account API to create a new user account and log in. Let us implement this in the `MockAuthenticationAsync()` function in the `Authentication` class:

```csharp
var location = Helpers.GenerateRandomString(10);
var password = Helpers.GenerateRandomString(10);
var invitation = Helpers.GenerateRandomString(15);
var authenticator = await Authenticator.CreateAccountAsync(location, password, invitation);
```
<br />
**3. Generate an `AuthReq`**

You first need to generate an `AuthReq` instance which provides information about the application and the permissions requested by this application. Let us implement this in the `GenerateEncodedAppRequestAsync()` function in the `Helpers` class:
```csharp
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo
    {
        Id = ConsoleAppConstants.AppId,
        Scope = string.Empty,
        Name = ConsoleAppConstants.AppName,
        Vendor = ConsoleAppConstants.Vendor
    },
    Containers = new List<ContainerPermissions>()
};
```

Make sure the function returns the encoded authRequest:
```csharp
return await Session.EncodeAuthReqAsync(authReq);
```
***Note:** Passing a list of `ContainerPermissions` allows the definition of various permissions provided to specific containers.*

**4. Authentication**

Use `Authenticator.EncodeAuthRespAsync` API which needs two parameters, AuthIpcReq and Response. Response is a boolean type representing whether you want to grant the permissions to an app or not. To grant the permissions use true, otherwise false. Once you get the response, decode it and register the app. Let us implement this in the `MockAuthenticationAsync()` function in the `Authentication` class after creating a mock account:
```csharp
var (_, reqMsg) = await Helpers.GenerateEncodedAppRequestAsync();
var ipcReq = await authenticator.DecodeIpcMessageAsync(reqMsg);
var authIpcReq = ipcReq as AuthIpcReq;
var resMsg = await authenticator.EncodeAuthRespAsync(authIpcReq, true);
var ipcResponse = await Session.DecodeIpcMessageAsync(resMsg);
var authResponse = ipcResponse as AuthIpcMsg;
var session = await Session.AppRegisteredAsync(ConsoleAppConstants.AppId, authResponse.AuthGranted);
```
And make sure the function returns the session.
```csharp
return session;
```

## Create mutable data
Mutable data is a key-value store which can be created either at a specific address or at a random address on the network. It can be publicly available (public mutable data) or encrypted (private mutable data). Mutable data has a type tag associated with it (a number) that can be chosen while creating the mutable data.

To learn more about the mutable data and other data types in SAFE Network visit the [discover page](/discover).

Now you will create a private mutable data in the network to store the application data at a random address. This address represents a unique 256 bit address in the network space. Learn more about XOR addresses from this [medium post](https://medium.com/@maidsafe/structuring-network-with-xor-431e785b5ee7).

**1. Create a random private mutable data**

`MDataInfo` allows us to locate and access the mutable data on the network. Use the `RandomPrivateAsync()` API to create a private random mutable data. This API returns the corresponding `MDataInfo` object. Implement this in `CreateMutableData()` function in the `DataOperations` class:


```csharp
const ulong tagType = 15010;
_mdinfo = await _session.MDataInfoActions.RandomPrivateAsync(tagType);
```

Although the type tag used is a random number, there is a range of reserved numbers for type tags - any mutable data stored with any of the reserved type tags will have special treatment by the network.

**2. Permission Sets**

Every mutable data on the network has a list of permissions which holds information about access given to applications for the forementioned data. The application's public signing key and it's respective `PermissionSet` are inserted into the mutable data permissions list. Add the following code to `CreateMutableData()` function in the `DataOperations` class after creating the mutable data:

```csharp
var mDataPermissionSet = new PermissionSet { Insert = true, ManagePermissions = true, Read = true, Update = true, Delete = true };
using (var permissionsH = await _session.MDataPermissions.NewAsync())
{
    using (var appSignKeyH = await _session.Crypto.AppPubSignKeyAsync())
    {
        await _session.MDataPermissions.InsertAsync(permissionsH, appSignKeyH, mDataPermissionSet);

        // Put the data on the network
    }
}
```

Once we have `MDataInfo`, `PermissionsHandle` and `EntriesHandle`, data can be commited to the network which is achieved using the `MData.PutAsync` API. As there are currently no entries for this mutable data,  pass `NativeHandle.EmptyMDataEntries`.

```csharp
await _session.MData.PutAsync(_mdinfo, permissionsH, NativeHandle.EmptyMDataEntries);
```

## Add entries to mutable data

Now that the mutable data is stored on the network, entries can be added.

An entry is a key-value pair. To insert an entry in mutable data the `InsertAsync()` API is used. This new entry transaction is done in locally and not on the network.

The `EntryActionHandle` points to in-memory transactions on mutable data.

To commit a change on the network use `MutateEntriesAsync` which requires `MDInfo` for the mutable data and `EntryActionHandle` which we created in the previous step, let us implement this in the `AddEntry(string key, string value)` function in the `DataOperations` class:

```csharp
using (var entryActionsH = await _session.MDataEntryActions.NewAsync())
{
    var encryptedKey = await _session.MDataInfoActions.EncryptEntryKeyAsync(_mdinfo, key.ToUtfBytes());
    var encryptedValue = await _session.MDataInfoActions.EncryptEntryValueAsync(_mdinfo, value.ToUtfBytes());
    await _session.MDataEntryActions.InsertAsync(entryActionsH, encryptedKey, encryptedValue);
    await _session.MData.MutateEntriesAsync(_mdinfo, entryActionsH);
}
```

The mutable data entries can be encrypted for security. Use `EncryptEntryKeyAsync` and `EncryptEntryValueAsync` to encrypt the key and the value respectively as demonstrated in code above.

Multiple transactions can be performed together and then `MutateEntriesAsync` action performed once to reflect these changes on the network keeping network traffic minimal.

## Read mutable data entries

Now that the mutable data is stored on the network with some entries, they can be retrieved using an `EntriesHandle`. To get `EntriesHandle` use the `GetHandleAsync` API.

Create a `MDataEntry` list in `GetEntries()` function in the `DataOperation` class to hold the mutable data entries fetched from the network:
```csharp
List<MDataEntry> entries = new List<MDataEntry>();
```

Retrieved data needs to be decrypted. To fetch and decrypt mutable data entries from the network, add the following code after creating a MDataEntry list.
```csharp
using (var entriesHandle = await _session.MDataEntries.GetHandleAsync(_mdinfo))
{
    var encryptedEntries = await _session.MData.ListEntriesAsync(entriesHandle);
    foreach (var entry in encryptedEntries)
    {
        if (entry.Value.Content.Count != 0)
        {
            var decryptedKey = await _session.MDataInfoActions.DecryptAsync(_mdinfo, entry.Key.Key);
            var decryptedValue = await _session.MDataInfoActions.DecryptAsync(_mdinfo, entry.Value.Content);
            entries.Add(new MDataEntry()
            {
                Key = new MDataKey() { Key = decryptedKey },
                Value = new MDataValue { Content = decryptedValue, EntryVersion = entry.Value.EntryVersion }
            });
        }
    }
}
```
And make sure the function returns the entry.
```csharp
return entries;
```
This method gets a list of entries from the `ListEntriesAsync` function. We can iterate through the list to get the key and the respective value for every entry and decrypt for the plain data.

## Update or Remove entries

To update or remove entries create a mutation transaction with "update" and/or "remove" actions, and apply the mutations to the mutable data. `MDataEntryActionHandle` and `key` are required to perform these operations, add the following in the functions `UpdateEntry(string key, string newValue)` and `DeleteEntry(string key)` respectively in the `DataOperations` class:

**To update an entry:**
```csharp
var keyToUpdate = await _session.MDataInfoActions.EncryptEntryKeyAsync(_mdinfo, key.ToUtfBytes());
var newValueToUpdate = await _session.MDataInfoActions.EncryptEntryValueAsync(_mdinfo, newValue.ToUtfBytes());
using (var entriesHandle = await _session.MDataEntryActions.NewAsync())
{
    var value = await _session.MData.GetValueAsync(_mdinfo, keyToUpdate);
    await _session.MDataEntryActions.UpdateAsync(entriesHandle, keyToUpdate, newValueToUpdate, value.Item2 + 1);
    await _session.MData.MutateEntriesAsync(_mdinfo, entriesHandle);
}
```
<br />

**To remove an entry:**
```csharp
var keyToDelete = await _session.MDataInfoActions.EncryptEntryKeyAsync(_mdinfo, key.ToUtfBytes());
using (var entriesHandle = await _session.MDataEntryActions.NewAsync())
{
    var value = await _session.MData.GetValueAsync(_mdinfo, keyToDelete);
    await _session.MDataEntryActions.DeleteAsync(entriesHandle, keyToDelete, value.Item2 + 1);
    await _session.MData.MutateEntriesAsync(_mdinfo, entriesHandle);
}
```
<br />
**Versioning in mutable data:**

Each entry in a mutable data has a version associated to it - a numeric value.

When a new entry is inserted, it is inserted with version 0. Every time a mutation is performed this version increases by 1, as specified in the above code. This is used by the network to ensure only one mutation is applied when simultaneous mutation requests are received for the same version of an entry. This ensures the state change of such an entry is what the originator of the request is intending to do.

When an entry is removed, it is never deleted from the mutable data, only the value is cleared. This ensures a new entry with the same key cannot be inserted - rather it is updated.

For this reason once entries are received using the `ListEntriesAsync()` function, you can apply a filter to check whether content length in zero or not.

You have already implemented this filter in `GetEntries()` function in the `DataOperation` class.

```csharp
var encryptedEntries = await session.MData.ListEntriesAsync(entriesHandle)
foreach (var entry in encryptedEntries)
{
    // Checking if data content size is not 0
    if (entry.Value.Content.Count != 0)
    {
        // Perform action
    }
}
```

Now you can run the application and see the working mutable data operations that we have implemented via the API.

## Migrating to the Alpha 2 Network

In the solution explorer right click on the `LiveNetworkExample` project and select **Set as StartUp Project**

The process to connect to live network is the same as mock except:
- The non-mock SAFE browser is used as indicated by its title `safe-browser-<version>-<platform>.zip` (see [prerequisites](#prerequisites) for instructions).
- The authentication process is against the live network and not the MockVault file.

**Note:** Before attempting to connect to the alpha-2 network, make sure that you have completed the steps in the [authenticate using mock browser section.](#connecting-to-the-mock-network)

**1. Download the SAFE (non-mock) Browser**

If you haven't already done so, download the SAFE (non-mock) Browser (see [prerequisites](#prerequisites) for instructions).

**2. Log in**

Log in using your existing SAFE Network account or create an account from the Authenticator.

Ensure to keep the browser opened and logged in with your account before proceeding with next steps.

**3. Build and run**

Running the application will now authenticate and perform all operations with the Alpha 2 Network.
