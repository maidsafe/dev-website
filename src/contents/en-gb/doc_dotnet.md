# SAFE .Net Desktop App Tutorial

In this tutorial we will create a [.Net Framework](https://docs.microsoft.com/en-us/dotnet/framework/) console application. The .NET Framework is a development platform for building apps for web, Windows, Windows Phone, Windows Server and Microsoft Azure using C#, Visual Basic and F#. This tutorial can also be used for developing [.Net Core](https://github.com/dotnet/core) apps.

You can download working example code [here](https://github.com/maidsafe/safe-getting-started-dotnet/SafeDesktopExample) or follow the steps described in this tutorial to create an app for SAFE Network.

## Pre-requisites

Before starting to work on your first SAFE app, make sure you have the following installed:

- **Visual Studio**:
Follow the instructions [here](https://visualstudio.microsoft.com/) to download and install Visual Studio (any edition) for your operating system (**Note:** .Net Framework and .Net Core SDKs are installed automatically when installing Visual Studio).

- **The SAFE Browser**:
To connect to the SAFE Network, applications are required to authenticate with the Authenticator. The Authenticator is bundled with the SAFE Browser and download links can be found from the [SAFE Browser GitHub releases page.](https://github.com/maidsafe/safe_browser/releases/latest)

**Note:**
  * It's recommended to use the latest available version for your platform; 
  * Packages for connecting to live network and mock  are available. This tutorial guides you through both.


## Set up a basic project

  * Create a new **C# desktop** project in Visual Studio 
  * Set the CPU architecture to **x64** in project build configuration (SAFE APIs support only x64 architecture for desktops)
  * Install the latest version of [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) package using NuGet package manager to expose the SAFE APIs which connect and interact with the SAFE Network.

## Connecting to the mock network

We provide the `mock` feature with SAFE APIs to provide for fast app development and a safe space to perform test operations.

When the `mock` feature is used, a local MockVault file is generated which simulates network operations used to store and retrieve data. The app will then interface with this file rather than the live SAFE network.

Use either of the following methods to set up and use the mock network based on your requirements:
- Mock Authenticator class: authenticate using the Authenticator class shipped in MaidSafe.SafeApp package. This method is helpful while working with tests.
- Safe-browser-mock: authentication using SAFE mock browser.

***Using mock Authenticator class***

**1. Add mock flag**

Add `SAFE_APP_MOCK` flag for your project in **Properties > Build > Conditional compilation symbols**.

Once this flag is set a reference to *SafeApp.MockAuthBindings.dll* will be added into the project automatically which has additional classes and functions used for mock authentication.

**2. Create a mock account**

Create a mock user account and log in using the same credentials. Here is example code which can be used for mock authentication:
```csharp
var location = "UserName";
var password = "Password";
var invitation = "Invitation";
var authenticator = await Authenticator.CreateAccountAsync(location, password, invitation);
authenticator = await Authenticator.LoginAsync(location, password);
``` 

**3. Generate an `AuthReq`**

We first need to generate an `AuthReq` instance which provides information about the application and the permissions requested by this application:
```csharp
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo 
    { 
        Id = "net.maidsafe.tutorial.dotnet", 
        Scope = "", 
        Name = "Hello SAFE Network", 
        Vendor = "MaidSafe.net Ltd." 
    },
    Containers = new List<ContainerPermissions> 
    { 
        new ContainerPermissions 
        { 
            ContName = "_publicNames", Access = { Insert = true } 
        }
    }
};
```
*Note: Passing a list of `ContainerPermissions` allows the definition of various permissions provided to specific containers.*

**4. Authentication**

Use `Authenticator.EncodeAuthRespAsync` API which use two parameters, AuthIpcReq and Response. Response is a boolean type representing whether you want to grant the permissions to an app or not. To grant the permissions use true, otherwise false. Once we get the response, decode it and register the app. Implementation code of the described process is as follows.
```csharp
var (_, reqMsg) = await Session.EncodeAuthReqAsync(authReq);
var ipcReq = await authenticator.DecodeIpcMessageAsync(reqMsg);
var authIpcReq = ipcReq as AuthIpcReq;
var resMsg = await authenticator.EncodeAuthRespAsync(authIpcReq, true);
var ipcResponse = await Session.DecodeIpcMessageAsync(resMsg);
var authResponse = ipcResponse as AuthIpcMsg;
var session = await Session.AppRegisteredAsync(appId, authResponse.AuthGranted);
```


***Using SAFE mock browser***

**1. Download the SAFE mock browser** 

Download the mock SAFE Browser as indicated by the file name `safe-browser-<version>-<platform>-dev.zip` (see pre-requisites for instructions)

**2. Add mock flag**

Add `SAFE_APP_MOCK` flag for your project in **Properties > Build > Conditional compilation symbols**.

**3. Log in**

Create an account on SAFE mock browser and log in (As this is  using mock any random arbitary string can be used as invite token).

Keep the browser open and logged in to this account before proceeding with next steps.

**4. Generate an `AuthReq`**

An `AuthReq` instance is generated with the code below:
```csharp
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo 
    { 
        Id = "net.maidsafe.tutorial.dotnet", 
        Scope = "", 
        Name = "Hello SAFE Network", 
        Vendor = "MaidSafe.net Ltd." 
    },
    Containers = new List<ContainerPermissions> 
    { 
        new ContainerPermissions 
        { 
            ContName = "_publicNames", Access = { Insert = true, Update = true, Delete = true} 
        }
    }
};
```
***Note:** Passing a list of `ContainerPermissions` allows the definition of various permissions provided to specific containers.*

**5. Send `AuthReq` to the Authenticator**

Once the `AuthReq` instance is initialised it is then used to generate the authorisation request and send it to the Authenticator using the following code:

```csharp
var encodedReq = await Session.EncodeAuthReqAsync(authReq);
var url = $"safe-auth://{encodedReq}";
System.Diagnostics.Process.Start(url);
```
**6. Grant access**

Once the authorisation request is received the Authenticator launches and a pop-up dialogue prompts for access (Allow or Deny). The Authenticator then sends the response back to the application.

Once the authorisation request is received, the Authenticator sends an authorisation response using the system URI mechanism. The system matches the URI scheme to the application and launches the application passing the URI as an argument.

.Net system_uri package will be a future release to achieve this on all platforms.

Note: The demo application already has the code to send a response from the new instance to the already running console app instance using [IPC Pipes](https://docs.microsoft.com/en-us/dotnet/standard/io/pipe-operations).

Once a response is received, it is decoded and checked whether the request was granted or denied. If the request was granted a new session is initialised to communicate with SAFE Network:
```csharp
var decodeResult = await Session.DecodeIpcMessageAsync(encodedRequest);
if (decodeResult.GetType() == typeof(AuthIpcMsg))
{
    var ipcMsg = decodeResult as AuthIpcMsg;
    //Create session object
    if (ipcMsg != null)
    {
        var session = await Session.AppRegisteredAsync(AppId, ipcMsg.AuthGranted);
    }
}
else
{
    Console.WriteLine("Auth Request is not Granted");
}
```


## Connecting to the live network

The process to connect to live is the same as mock except:
- The non-mock SAFE browser is used as indicated by its title `safe-browser-<version>-<platform>.zip` (see pre-requisites for download instructions).
- The authentication process is against the live network and not the MockVault file.

**1. Download the SAFE (non-mock) browser** 

If you haven't already done so, download the SAFE (non-mock) Browser (see pre-requisites for instructions)

**2. Log in**

Log in using your existing SAFE Network account or create an account from the Authenticator.

Keep the browser open and logged in to your account before proceeding with next steps.

**3. Authentication code**

Authentication steps are the same as mentioned in mock authentication using SAFE mock browser. So, Follow steps 4-6 given in previous section.

## Create mutable data

Mutable data is a key-value store which can be created at either a specific address on the network or at a random address. It can be publicly available (public mutable data) or encrypted (private mutable data). Mutable data has a type tag associated with it (a number) that can be chosen while creating the mutable data.

To learn more about the mutable Data and other data types in SAFE Network visit [Discover Page](/discover).

For this tutorial, we will: 
- Create a mutable data object in the network to store the application data.
- Create public mutable data at a random address (this address represents a unique 256 bit address in the network space. Learn more about XOR addresses at [MaidSafe's blog](https://blog.maidsafe.net/2016/05/27/structuring-networks-with-xor)).

**1. Create `MDataInfo`**

Creating an `MDataInfo` allows us to locate and access the mutable data on the network. Create an `MDataInfo` for a public random mutable data to operate on:

```csharp
const ulong tagType = 15010;
var mdInfo = await session.MDataInfoActions.RandomPublicAsync(tagType);
```

Athough the type tag used is a random number, there is a range of reserved numbers for type tags - any mutable data stored with any of reserved type tags will have special treatment by the network.

**2. Permission Sets**

Every mutable data on the network has an associated `PermissionSet` which holds information about a user's  access given for a particular mutable data. A new `PermissionsHandle` is created which points to the mutable data permissions on the network. Then the user's public signing key and `PermissionSet` are inserted into mutable data permissions on the network directly:

```csharp
var mDataPermissionSet = new PermissionSet { Insert = true, ManagePermissions = true, Read = true };
using (var permissionsH = await session.MDataPermissions.NewAsync())
{
    using (var appSignKeyH = await session.Crypto.AppPubSignKeyAsync())
    {
        await session.MDataPermissions.InsertAsync(permissionsH, appSignKeyH, mDataPermissionSet);
        await session.MData.PutAsync(mdInfo, permissionsH, NativeHandle.Zero);
    }
}
```
**3. Commit the data** 

Now the only operation left is to commit the mutable data to the network which is achieved by `MData.PutAsync` API. `MDataInfo`, `PermissionsHandle` and `EntriesHandle` are needed for this operation. As there are no entries for this mutable data currently,  pass `NativeHandle.Zero`:

```csharp
await session.MData.PutAsync(mdInfo, permissionsH, NativeHandle.Zero);
```

## Add entries to mutable data

Now the mutable data is stored on the network, entries can now be added.

An entry is a key-value pair. To insert an entry in mutable data the  `InsertAsync` method is used. This new entry transaction is done in runtime memory not on the network. 

The `EntryActionHandle` points to a transaction on a mutable data in memory. 

To commit a change on the network use `MutateEntriesAsync` which requires `MDInfo` for the mutable data and `EntryActionHandle` which we created in the previous step:

```csharp
using (var entryActionsH = await session.MDataEntryActions.NewAsync())
{
    for (int i = 0; i < 5; i++)
    {
        var actKey = "key" + i;
        var actValue = "value" + i;
        var key = Encoding.ASCII.GetBytes(actKey).ToList();
        var value = Encoding.ASCII.GetBytes(actValue).ToList();
        await session.MDataEntryActions.InsertAsync(entryActionsH, key, value);
    }
    await session.MData.MutateEntriesAsync(mdInfo, entryActionsH);
}
```
Multiple transactions can be performed together and then `MutateEntriesAsync` action performed once to reflect these changes on the network and keeps network traffic minimal.

## Read mutable data entries

Now the mutable data is stored on the network with multiple entries, these can be retrieved using an `EntriesHandle`. To get `EntriesHandle` use `GetHandleAsync` function in `MDEntries` class and `MDInfo` of mutable data.

Here is a method to fetch mutable data entries from network:
```csharp
using (var entriesHandle = await session.MDataEntries.GetHandleAsync(mDataInfo))
{
    var entries = await session.MData.ListEntriesAsync(entriesHandle)
    foreach (var entry in entries)
    {
        var key = entry.Key.Val;
        ver value = entry.Value.Content;
    }
}
```
This method gets a list of entries from the `ListEntriesAsync` function. We can iterate through the list to get the key and respective value for every entry.

## Update and remove entries

To update or remove entries create a mutation transaction (as above) with "update" and/or "remove" actions, and apply the mutations to the mutable data. `MDataEntryActionHanle` and `key` are required to perform these operations:

**To update an entry:**
```csharp
var keys = await session.MData.ListKeysAsync(mdInfo);
var keyToUpdate = keys[0];
var newValue = "NewDataValue";
using (var entriesHandle = await session.MDataEntryActions.NewAsync())
{
    var value = await session.MData.GetValueAsync(mdInfo, keyToUpdate.Val);
    await session.MDataEntryActions.UpdateAsync(entriesHandle, keyToUpdate.Val, newValue.ToUtfBytes(), value.Item2 + 1);
    await session.MData.MutateEntriesAsync(mdInfo, entriesHandle);
}
```

**To remove an entry:**
```csharp
var keys = await session.MData.ListKeysAsync(mdInfo);
var keyToDelete = keys[0];
using (var entriesHandle = await session.MDataEntryActions.NewAsync())
{
    var value = await session.MData.GetValueAsync(mdInfo, keyToDelete.Val);
    await session.MDataEntryActions.DeleteAsync(entriesHandle, keyToDelete.Val, value.Item2 + 1);
    await session.MData.MutateEntriesAsync(mdInfo, entriesHandle);
}
```

For both update and remove (not insert) a 1 is added to `value.Item2` and passed to the entry action function. This allows for versioning.

## Versioning in mutable data

Each entry in a mutable data has a version associated to it - a numeric value. 

When a new entry is inserted it's inserted with version 0. Every time a mutation is performed this version increases by one, as specified in the above code. This is used by the network to ensure only one mutation is applied when simultaneous mutation requests are received for the same version of an entry. This ensures the state change of such an entry is what the originator of the request is intending to do.

When an entry is removed it is never deleted from the mutable data, only the value is cleared. This ensures a new entry with the same key cannot be inserted - rather it is updated (ravi: does this sentence read correctly? I think I've understood what you meant but please double check). 

For this reason once entries are received using the `ListEntriesAsync` function, a filter is applied to the deleted entries with the following condition when iterating through them:

```csharp
if (value.Count == 0) return;
```
