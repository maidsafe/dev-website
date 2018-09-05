# SAFE .Net Desktop App Tutorial

In this tutorial, we will create a [.Net Framework](https://docs.microsoft.com/en-us/dotnet/framework/) console application. The .NET Framework is a development platform for building apps for web, Windows, Windows Phone, Windows Server, and Microsoft Azure using C#, Visual Basic and F#. This tutorial can also be used for developing [.Net Core](https://github.com/dotnet/core) apps.

To create this app, we will use the [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) NuGet package which exposes the SAFE APIs to connect and interact with the SAFE Network.

Download the working example code [here](https://github.com/maidsafe/safe-getting-started-dotnet/SafeDesktopExample) or follow the steps described in this tutorial to create an app for SAFE Network.

## Pre-requisites

Before we start working on our first SAFE app, make sure you have the following tools installed to be able to follow this tutorial:

- **Visual Studio**: You need Visual Studio to compile and run your app. Follow the instructions [here](https://visualstudio.microsoft.com/) to download and install the Visual Studio for your operating system. .Net Framework and .Net Core SDKs are installed automatically while installing Visual Studio.

## Install SAFE Browser

Since the application will be authenticated with the Authenticator to get the credentials needed to connect to the SAFE Network, we first need to have an instance of the SAFE Browser installed.

You can find the links to download the SAFE Browser package from the [SAFE Browser GitHub releases](https://github.com/maidsafe/safe_browser/releases). It's always recommended to use the latest available version.

Note that there are packages for each of the supported platforms, i.e. Linux, Windows and macOS. Also, note there are two types of packages for each of the supported platforms:
- `safe-browser-<version>-<platform>.zip`: Safe Browser package built to use the live SAFE Network
- `safe-browser-mock-<version>-<platform>.zip`: Safe Browser package built to use the mock routing. This will create a local temporary file and you won't need to connect to the live network.

In this tutorial, we will be using the Safe Browser package that is built to work with the live network. So please go ahead and download the one corresponding for your platform, and unzip the package in your PC.

Please login using your existing SAFE Network account or create an account from the Authenticator.

After you finished creating your account, please keep the browser open and logged in to your account before proceeding with next steps.

## Set up a basic project

- Create a new Project: Create a new c# desktop project in visual studio. For this demo, we are creating a console app.
- Set CPU architecture: SafeApp APIs support only x64 architecture for desktops. So set the CPU architecture to x64 in project build configuration.
- Install MaidSafe.SafeApp package: Install the latest version of [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) package using NuGet package manager. 

## Connecting to Live SAFE Network

To be able to connect to the SAFE Network, a SAFE application needs to get an authorisation from the user. This is achieved by sending an authorisation request to the Authenticator (which is bundled with SAFE browser).

We first need to generate an `AuthReq` instance which provides information about the application and the permissions requested by this application. These details will be displayed in the Authenticator:
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
Note that we are passing a list of `ContainerPermissions`, this allows us to define the various permissions provided to specific containers.

When the Authenticator sends an authorisation response using the system URI mechanism, the system matches the URI scheme to our application, and it launches our application passing the URI as an argument.

Since the application is run using the dotnet executable, we need to make sure the system registers the URI scheme with the dotnet executable file path. This is achieved using the system registry. 

.Net `system_uri` package will be a future release to achieve this on all platforms.

Once the `AuthReq` instance is initialised, we can use it to generate the authorisation request and send it to the Authenticator:
```csharp
var encodedReq = await Session.EncodeAuthReqAsync(authReq);
var url = $"safe-auth://{encodedReq}";
System.Diagnostics.Process.Start(url);
```
This code will generate the authorisation request and send it to the Authenticator. Remember to launch the SAFE Browser and login using the Authenticator ([How to install the SAFE Browser](#install-safe-browser)) before running the application.

You will notice a pop-up on the Authenticator prompting an authorisation request with the information of the application. At this point you can allow or deny the request, and the Authenticator will send the response back to the application.

The demo application already has the code to send a response from the new instance to the already running console app instance using [IPC Pipes](https://docs.microsoft.com/en-us/dotnet/standard/io/pipe-operations).
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

Once a response is received, it is decoded and checked whether the request was granted or denied. If the request was granted a new new session is initialised to communicate with SAFE Network.


## Using Mock Network

We provide the mock feature with SAFE APIs which can be used for fast app development and provides a safe space to perform test operations. 

When we use the mock feature in an application, it does not communicate with the live network. Instead, it will interface with a local MockVault file in the system to simulate network operations, which is used to store and retrieve data. Let's see how we can set up and use the mock network:

- Build conditional compilation symbols: Add `SAFE_APP_MOCK` flag for your project in `Properties > Build > Conditional compilation symbols'.

Once we set this flag in build settings, a reference to `SafeApp.MockAuthBindings.dll` will be added into the project automatically. It has additional classes and functions used for mock authentication. We can use any of the following processes for mock authentication based on our requirements.

- Safe-browser-mock: We need to download and setup safe-browser-mock version for this. Follow [install-safe-browser](#install-safe-browser) for setting up mock browser. Authentication process will be the same as in [connecting-live-network](#connecting-to-live-safe-network) except we will use safe-browser-mock. 
- Authenticator: In this process, we use authenticator shipped with MaidSafe.SafeApp package. This is quite helpful while working with tests.

Following is the example code, we can use for mock authentication.
We create a mock user account and authenticate using the same without worrying about the safe-browser authentication process.

```csharp
var location = "UserName";
var password = "Password";
var invitation = "Invitation";
var authenticator = await Authenticator.CreateAccountAsync(location, password, invitation);
authenticator = await Authenticator.LoginAsync(location, password);
```
Once we have an authenticator object we will follow the previously described method for generating and encoding the `AuthReq` instance. The only new thing here is `Authenticator.EncodeAuthRespAsync` method which use two parameters, `AuthIpcReq` and `Response`. `Response` is a boolean type representing whether you want to grant the permissions to an app or not. To grant the permissions use true, otherwise false. Once we get the response, decode it and register the app. Implementation code of the described process is as follows.
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
var (_, reqMsg) = await Session.EncodeAuthReqAsync(authReq);
var ipcReq = await authenticator.DecodeIpcMessageAsync(reqMsg);
var authIpcReq = ipcReq as AuthIpcReq;
var resMsg = await authenticator.EncodeAuthRespAsync(authIpcReq, true);
var ipcResponse = await Session.DecodeIpcMessageAsync(resMsg);
var authResponse = ipcResponse as AuthIpcMsg;
var session = await Session.AppRegisteredAsync(appId, authResponse.AuthGranted);
```

## Create a public Mutable Data
A Mutable Data is a key-value store which can be created at either a specific address on the network or at a random address. It can be publicly available (public Mutable Data) or encrypted ( private Mutable Data). Mutable Data has a type associated with it (type tag) which is a number that can be chosen while creating the Mutable Data.

To learn more about the Mutable Data and other Data types in SAFE Network visit [Discover Page](/discover).

In this tutorial, we are going to create a Mutable Data object in the network to store the application data. We will create a public Mutable Data at a random address. This address represents a unique 256 bits address in the network space. Learn more about XOR addresses at [MaidSafe's blog](https://blog.maidsafe.net/2016/05/27/structuring-networks-with-xor).

To work with Mutable Data, we need corresponding `MDataInfo`. An `MDataInfo` allows us to locate and access Mutable Data on the network. So first we will create an MDataInfo for a public random Mutable Data then we will operate on that.

```csharp
const ulong tagType = 15010;
var mdInfo = await session.MDataInfoActions.RandomPublicAsync(tagType);
```

The typetag we are using is just a random number, although you must know there is a range of reserved numbers for the type tags, any mutable data stored with any of reserved type tags will have a special treatment by the network.

Every Mutable Data on the network has associated PermissionSets. A PermissionSet holds the information about a user and accesses given to him for a particular Mutable Data. A new `PermissionsHandle` is created which points to the mutable data permissions on the network. Then, Users, public signing key and `PermissionSet` are inserted into Mutable Data permissions on the network directly.

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
Now only operation left is to commit the Mutable Data on network which is achieved by following API. We need `MDataInfo`, `PermissionsHandle` and `EntriesHandle` for this operation. We don't have any entries for this mutable data currently, so we will pass `NativeHandle.Zero`.

```csharp
await session.MData.PutAsync(mdInfo, permissionsH, NativeHandle.Zero);
```

## Add entries to our Mutable Data

We now have our Mutable Data stored on the network with no entries, so now we will add some entries into the existing Mutable Data. An `EntryActionHandle` points to a transaction on a Mutable Data in memory. 

An entry is a key-value pair. To insert an entry in Mutable Data we use `InsertAsync` method. But, this new entry transaction is done in memory, not on the network. 

To commit this change on the network we use `MutateEntriesAsync` which requires `MDInfo` for our Mutable Data and `EntryActionHandle` which we just created.

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
We can perform multiple transactions together and perform `MutateEntriesAsync` action once to reflect those changes on network. This is to reduce the network traffic needed to perform several mutations for every transaction we do on a single Mutable Data.

## Read the Mutable Data entries

Now we have our Mutable Data stored on the network with multiple entries, thus we can retrieve them using an `EntriesHandle`. To get that we use `GetHandleAsync` function in `MDEntries` class. We need `MDInfo` of Mutable Data for that, which we already have.

Let's write a method to fetch Mutable Data entries from network:
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
We are getting a list of entries from `ListEntriesAsync` function. We can iterate through the list to get key and respective value for every entry.

## Update and remove entries

As we saw above, to update or remove entries we just need to create a mutation transaction, with "update" and/or "remove" actions, and apply the mutations to the Mutable Data. We will need `MDataEntryActionHanle` and `key` to perform these operations.

Let's try to update an entry Item:
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

Code to remove entry from Mutable Data:
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

This seems easy but did you notice we are adding 1 to `value.Item2` and passing it to entry action function while deleting/updating while it was not involved when we performed "insert" mutation. What is this? It's called versioning. Let's know a little more about versioning.

## Versioning in Mutable Data

Each entry in a Mutable Data has a version associated to it. It is a numeric value. When you insert a new entry it's inserted with version 0, and every time a mutation is performed you need to specify the subsequent version the entry is being bumped to. This is used by the network to ensure that only one mutation is applied when simultaneous mutations requests were received for the same version of an entry, making sure the state change of such an entry is effectively what the originator of a request was intending to do.

Also, bear in mind that when you remove an entry it is never deleted from the Mutable Data, but its value is just cleared, so you cannot insert a new entry with the same key but update it. This is the reason that once we get the entries using `ListEntriesAsync` function, we filter the deleted entries with the following condition when iterating through them:

```csharp
if (value.Count == 0) return;
```
