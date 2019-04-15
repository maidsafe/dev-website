# SAFE Mobile App Tutorial

This tutorial shows you how to create a [Xamarin.Forms](https://github.com/xamarin/Xamarin.Forms/) application for the SAFE Network. Xamarin.Forms is an open source, cross-platform tool which provides a way to quickly build apps for iOS, Android, Windows and macOS using C# and F#.

<a href="/video#xamarin">
<img src="https://i.postimg.cc/Mp6VpjqV/Tutorial-Coming-Soon.png" alt="Xamarin Tutorial - Microsoft Visual Studio" style="width: 100%;"/>
</a>

In this tutorial we will use the [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) NuGet package which exposes the SAFE API to connect and interact with the SAFE Network.

You can download the working example code from [GitHub](https://github.com/maidsafe/safe-getting-started-dotnet/tree/master/MobileExample) or follow the steps provided in this tutorial to create a mobile app for the SAFE Network.

## Prerequisites

Before you start working on your first SAFE app, make sure you have the following tools installed:
- **Git**
<br />
To fetch the boilerplate code and for version control.
- **Visual Studio**
<br />
[Download and install Visual Studio](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/installation) (any edition) for your operating system with `mobile development with .NET` workload.
- **Safe Authenticator**
<br />
The Safe Authenticator mobile application is required to authenticate with the SAFE Network. You can download it from [GitHub](https://github.com/maidsafe/safe-authenticator-mobile/releases/latest).
- **Beginner level knowledge of Xamarin.Forms**
<br />
An introduction to Xamarin.Forms can be found in the [official documentation](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/introduction-to-xamarin-forms).

## Setup the basic skeleton

The basic setup of the application is available in a git repository. Let's get started by cloning this repository

```bash
git clone https://github.com/maidsafe/safe-getting-started-dotnet
cd safe-getting-started-dotnet
git checkout boilerplate
```
<br />
Open `MobileExample/SafeTodoExample.sln` solution in Visual Studio and restore nuget packages.

**Note:**
  We use the latest version of the MaidSafe.SafeApp package using NuGet package manager to use the SAFE API which connect and interact with the SAFE Network.

## Using a Mock Network

We provide the `mock` feature with the SAFE API for faster app development experience and a safe space to perform test operations.

When the `mock` feature is used, a local MockVault file is generated which simulates the network operations used to store and retrieve data. The app will then interface with this file rather than the live SAFE Network. To set up and use a mock network:

**1. Build conditional compilation symbols**

- Visual Studio: Add `SAFE_APP_MOCK` flag to SafeTodoExample project in **Properties** > **Build** >   **Conditional compilation symbols**.
- Visual Studio for Mac: Add `SAFE_APP_MOCK` flag to SafeTodoExample project in **Options** > **Compiler** >   **Define symbols**.
- Add the flag to the platform specific projects too.

Once this flag is set in the build settings, a reference to `SafeApp.MockAuthBindings.dll` will be added to the project automatically which has additional classes and functions used for mock authentication.

**2. Create a mock account**

Use `CreateAccountAsync()` API to create a new user account and log in. Let us implement this in the `CreateAccountAsync()` function in `AppService` class:

```csharp
var location = "UserName";
var password = "Password";
var invitation = "Invitation";
_authenticator = await Authenticator.CreateAccountAsync(location, password, invitation);
```
<br />
**3. Generate an `AuthRequest`**

Let us create an AuthReq instance in the `GenerateEncodedAuthReqAsync()` function in `AppService` class:

```csharp
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo
    {
        Id = Constants.AppId,
        Scope = string.Empty,
        Name = Constants.AppName,
        Vendor = Constants.Vendor
    },
    Containers = new List<ContainerPermissions>()
};

```

Return the encoded auth request.

```csharp
return await Session.EncodeAuthReqAsync(authReq);
```
<br />
**4. Authentication**

The `Authenticator.EncodeAuthRespAsync` API needs two parameters: AuthIpcReq and Response. Response is a boolean type representing whether you want to grant the permissions to an app or not. To grant the permissions use true, otherwise false. Once you get the response, decode it and register the app. Let us implement this in the `CreateTestAppAsync()` function in `AppService` class after creating a mock account:
```csharp
var (_, reqMsg) = await GenerateEncodedAuthReqAsync();
var ipcReq = await _authenticator.DecodeIpcMessageAsync(reqMsg);
var authIpcReq = ipcReq as AuthIpcReq;
var resMsg = await _authenticator.EncodeAuthRespAsync(authIpcReq, true);
var ipcResponse = await Session.DecodeIpcMessageAsync(resMsg);
var authResponse = ipcResponse as AuthIpcMsg;
return await Session.AppRegisteredAsync(Constants.AppId, authResponse.AuthGranted);
```

## Create mutable data
Mutable data is a key-value store which can be created either at a specific address or at a random address on the network. It can be publicly available (public mutable data) or encrypted (private mutable data). Mutable data has a type tag associated with it (a number) that can be chosen while creating the mutable data.

To learn more about mutable data and other data types in SAFE Network visit the [discover page](/discover).

In this tutorial you will create a private mutable data at a random address to store application data. This address represents a unique 256 bit address in the network space. You can learn more about XOR addresses from [this medium post](https://medium.com/@maidsafe/structuring-network-with-xor-431e785b5ee7).

**1. Create a random private mutable data**

`MDataInfo` allows us to locate and access the mutable data on the network. Use the `RandomPrivateAsync()` API to create a private random mutable data. This API returns the corresponding `MDataInfo` object. Implement this in `CreateMutableData()` function in `AppService` class:

```csharp
const ulong tagType = 16000;
_mDataInfo = await _session.MDataInfoActions.RandomPrivateAsync(tagType);
```

Although the type tag used is a random number, there is a range of reserved numbers for type tags - any mutable data stored with any of the reserved type tags will have special treatment by the network.

**2. Permission Sets**

Every mutable data on the network has a list of permissions which holds information about access given to applications for the forementioned data. The application's public signing key and it's respective `PermissionSet` are inserted into the mutable data permissions list. Add the following code to `CreateMutableData()` function in `AppService` class after creating the mutable data:

```csharp
var mDataPermissionSet = new PermissionSet
{
    Insert = true,
    ManagePermissions = false,
    Read = true,
    Update = true,
    Delete = true
};
using (var permissionsH = await _session.MDataPermissions.NewAsync())
{
    using (var appSignKeyH = await _session.Crypto.AppPubSignKeyAsync())
    {
        await _session.MDataPermissions.InsertAsync(permissionsH, appSignKeyH, mDataPermissionSet);
        // Put the data on the network
    }
}
```

Once we have `MDataInfo`, `PermissionsHandle` and `EntriesHandle`, data can be committed to the network which is achieved using the `MData.PutAsync` API. As there are currently no entries for this mutable data, pass `NativeHandle.EmptyMDataEntries`.

```csharp
await _session.MData.PutAsync(_mDataInfo, permissionsH, NativeHandle.EmptyMDataEntries);
```

## Add entries to mutable data

Now that the mutable data is stored on the network, entries can be added.

An entry is a key-value pair. To insert an entry in mutable data the  `InsertAsync()` method is used. This new entry transaction is completed locally and not on the network.

The `EntryActionHandle` points to in-memory transactions on mutable data.

To commit a change on the network, use `MutateEntriesAsync` which requires `MDInfo` for the mutable data and `EntryActionHandle` which you created in the previous step, let us implement this in the     `AddItemAsync(TodoItem todoItem)` function in `AppService` class:

```csharp
using (var entriesHandle = await _session.MDataEntryActions.NewAsync())
{
    var encryptedKey = await _session.MDataInfoActions.EncryptEntryKeyAsync(_mDataInfo, todoItem.Title.ToUtfBytes());
    var encryptedValue = await _session.MDataInfoActions.EncryptEntryValueAsync(_mDataInfo, todoItem.Serialize());
    await _session.MDataEntryActions.InsertAsync(entriesHandle, encryptedKey, encryptedValue);
    await _session.MData.MutateEntriesAsync(_mDataInfo, entriesHandle);
}
```
<br />
The key-value pairs stored in the mutable data are of type byte[]. We can serialise and deserialise the objects using the `ObjectSerialize` functions provided in the boilerplate.

The mutable data entries can be encrypted for security. Use `EncryptEntryKeyAsync` and `EncryptEntryValueAsync` to encrypt the key and the value respectively as demonstrated in code above.

Multiple transactions can be performed together and then `MutateEntriesAsync` action performed once to reflect these changes on the network keeping network traffic minimal.

## Read mutable data entries

Now the mutable data is stored on the network with some entries, these can be retrieved using an `EntriesHandle`. To get `EntriesHandle` use `GetHandleAsync` API.

Create a `TodoItem` list in `GetItemsAsync()` function in `AppService` class to hold the mutable data entries fetched from the network:
```csharp
var todoItems = new List<TodoItem>();
```

Retrieved data needs to be decrypted. To fetch and decrypt mutable data entries from the network, add the following code after creating a `todoItems` list.

```csharp
using (var entriesHandle = await _session.MDataEntries.GetHandleAsync(_mDataInfo))
{
    var encryptedEntries = await _session.MData.ListEntriesAsync(entriesHandle);
    foreach (var entry in encryptedEntries)
    {
        if (entry.Value.Content.Count <= 0)
            continue;

        var decryptedKey = await _session.MDataInfoActions.DecryptAsync(_mDataInfo, entry.Key.Key);
        var decryptedValue = await _session.MDataInfoActions.DecryptAsync(_mDataInfo, entry.Value.Content);
        var deserializedValue = decryptedValue.Deserialize();
        todoItems.Add(deserializedValue as TodoItem);
    }
}
```
And make sure the function returns the list.
```csharp
return todoItems;
```
This method gets a list of entries using the `ListEntriesAsync()` API. We can iterate through the list to get the encrypted key-value pairs and decrypt the value to get the required data.
## Update and remove entries

To update or remove entries create a mutation transaction with "update" and/or "remove" actions and apply the mutations to the mutable data. `MDataEntryActionHanle` and `key` are required to perform these operations. Add the following code in the functions `UpdateItemAsync(TodoItem todoItem)` and `DeleteItemAsync(TodoItem todoItem)` respectively in the `AppService` class:

**To update an entry:**
```csharp
using (var entriesHandle = await _session.MDataEntryActions.NewAsync())
{
    var keyToUpdate = await _session.MDataInfoActions.EncryptEntryKeyAsync(_mDataInfo, todoItem.Title.ToUtfBytes());
    var newValueToUpdate = await _session.MDataInfoActions.EncryptEntryValueAsync(_mDataInfo, todoItem.Serialize());
    var value = await _session.MData.GetValueAsync(_mDataInfo, keyToUpdate);
    await _session.MDataEntryActions.UpdateAsync(entriesHandle, keyToUpdate, newValueToUpdate, value.Item2 + 1);
    await _session.MData.MutateEntriesAsync(_mDataInfo, entriesHandle);
}
```
<br />
**To remove an entry:**
```csharp
using (var entriesHandle = await _session.MDataEntryActions.NewAsync())
{
    var keyToDelete = await _session.MDataInfoActions.EncryptEntryKeyAsync(_mDataInfo, todoItem.Title.ToUtfBytes());
    var value = await _session.MData.GetValueAsync(_mDataInfo, keyToDelete);
    await _session.MDataEntryActions.DeleteAsync(entriesHandle, keyToDelete, value.Item2 + 1);
    await _session.MData.MutateEntriesAsync(_mDataInfo, entriesHandle);
}
```

## Making use of the app's container

Since the mutable data is randomly generated, a new mutable data is generated every time the app starts and consequently the entries made in the previous mutable data will be lost. Thus, we need to store this mutable data info in a location that is accessible by the application. For this, we can use the app's container. The app's container is mutable data that is exclusive per app per user.

We can serialise and store the `_mDataInfo` in the app container so that we can re-use the mutable data that was randomly generated the first time the app is launched.

When the application starts we should first check for existent `_mDataInfo` in the app's container, fetch it and deserialise it. If the data does not exist, then we create a new mutable data and store it in the app's container.

To serialise, encrypt and store the `_mDataInfo` for the application in app container, implement following in `StoreMdInfoAsync()` in `AppService` class:
```csharp
var serializedMDataInfo = await _session.MDataInfoActions.SerialiseAsync(_mDataInfo);
var appContainerMDataInfo = await _session.AccessContainer.GetMDataInfoAsync("apps/" + Constants.AppId);
var encryptedAppKey = await _session.MDataInfoActions.EncryptEntryKeyAsync(appContainerMDataInfo, AppContainerListKey.ToUtfBytes());
var encryptedMDataInfo = await _session.MDataInfoActions.EncryptEntryValueAsync(appContainerMDataInfo, serializedMDataInfo);
using (var appContEntActH = await _session.MDataEntryActions.NewAsync())
{
    await _session.MDataEntryActions.InsertAsync(appContEntActH, encryptedAppKey, encryptedMDataInfo);
    await _session.MData.MutateEntriesAsync(appContainerMDataInfo, appContEntActH);
}
```
<br />
To retrieve `_mDataInfo` from app container and decrypt implement following in `GetMdInfoAsync()` in `AppService` class:
```csharp
var appContainerMDataInfo = await _session.AccessContainer.GetMDataInfoAsync("apps/" + Constants.AppId);
var encryptedAppKey = await _session.MDataInfoActions.EncryptEntryKeyAsync(appContainerMDataInfo, AppContainerListKey.ToUtfBytes());
var encryptedValue = await _session.MData.GetValueAsync(appContainerMDataInfo, encryptedAppKey);
if (encryptedValue.Item1 != null)
{
    var plainValue = await _session.MDataInfoActions.DecryptAsync(appContainerMDataInfo, encryptedValue.Item1);
    _mDataInfo = await _session.MDataInfoActions.DeserialiseAsync(plainValue);
}
```

## Versioning in mutable data

Each entry in a mutable data has a version associated to it - a numeric value.

When a new entry is inserted, it is inserted with version 0. Every time a mutation is performed this version increases by 1, as specified in the above code. This is used by the network to ensure only one mutation is applied when simultaneous mutation requests are received for the same version of an entry. This ensures the state change of such an entry is what the originator of the request is intending to do.

When an entry is removed, it is never deleted from the mutable data, only the value is cleared. This ensures a new entry with the same key cannot be inserted - rather it is updated.

We are checking whether content length is zero or not when iterating through the items we fetched in `GetItemsAsync()` function in `AppService` class:

```csharp
var encryptedEntries = await _session.MData.ListEntriesAsync(entriesHandle);
    foreach (var entry in encryptedEntries)
    {
        if (entry.Value.Content.Count <= 0)
            continue;

        var decryptedKey = await _session.MDataInfoActions.DecryptAsync(_mDataInfo, entry.Key.Key);
        var decryptedValue = await _session.MDataInfoActions.DecryptAsync(_mDataInfo, entry.Value.Content);
        var deserializedValue = decryptedValue.Deserialize();
        todoItems.Add(deserializedValue as TodoItem);
    }
```
<br />
Now you can run the application, authenticate and work with todo items in the list that we have implemented.

## Connecting to the live network

*Note: Ensure `SAFE_APP_MOCK` flag is removed from shared and platform specific projects' conditional compilation symbols.*

To connect to the live Alpha-2 Network, an application needs to get authorisation from the user. This is achieved by sending an authorisation request to the Authenticator (SAFE Authenticator app in this case):

**1. Send `AuthReq` to the Authenticator**

*Note: Make sure you have Authenticator App installed and logged in before running the application ([see prerequisites](#prerequisites)).*

Generate the authorisation request and send it to the Authenticator using the following code. Let us implement this in `ProcessNonMockAuthentication()` function in `AppService` class:
```csharp
var encodedAuthReq = await GenerateEncodedAuthReqAsync();
var url = UrlFormat.Format(Constants.AppId, encodedAuthReq.Item2, true);
Device.BeginInvokeOnMainThread(() => { Device.OpenUri(new Uri(url)); });
```
<br />
**2. Grant access**

Once the authorisation request is received, the Authenticator launches and a pop-up dialogue prompts for access (Allow or Deny). The Authenticator then sends the response back to the application using the URI scheme. The OS matches the URI scheme to the application and launches the application passing `EncodedAuthResponse` as an argument.

**3. Use the response**

To extract and use the response from the Authenticator follow these steps for the respective mobile OS:

**Android: Use `IntentFilter` so the app can respond to the URL**
- Add an `IntentFilter` parameter in the `MainActivity` attribute. After making this change the `MainActivity` should match the following code:
```csharp
    [Activity(
        Label = "SafeTodoExample",
        Icon = "@mipmap/icon",
        Theme = "@style/MainTheme",
        MainLauncher = true,
        LaunchMode = LaunchMode.SingleTask,
        ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    [IntentFilter(
            new[] { Intent.ActionView },
            Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
            DataScheme = Constants.AppId)]
```
- Once this property is set, update `OnCreate()` method and override the `OnNewIntent` action in the `MainActivity` class to perform the next action:

```csharp
protected override void OnCreate(Bundle savedInstanceState)
{
    ...
    ...
    LoadApplication(new App());

    // Check for intent data after LoadApplication(new App());
    if (Intent?.Data != null)
    {
        HandleAppLaunch(Intent.Data.ToString());
    }
}

protected override void OnNewIntent(Intent intent)
{
    base.OnNewIntent(intent);
    if (intent?.Data != null)
    {
        HandleAppLaunch(intent.Data.ToString());
    }
}
```
- Add a new function `HandleAppLaunch(string url)` in the `MainActivity` class to send response to `AppService` class where we will decode the response and initialise the session.
```csharp
private void HandleAppLaunch(string url)
{
    Device.BeginInvokeOnMainThread(
        async () =>
        {
            try
            {
                await AppService.HandleUrlActivationAsync(url);

                System.Diagnostics.Debug.WriteLine("IPC Msg Handling Completed");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error: {ex.Message}");
            }
        });
}
```
<br />
**iOS: Use the URL Types Registration feature**
The URL Types Registration feature, available in the `Info.plist` file, can be added using the UI editor:

- Open the `Info.plist` file in the UI editor and open `Advanced > URL Types > Add URL Type` and add the following properties:

```csharp
Identifier: SafeTodoExample
URL Schemes: net.maidsafe.examples.todo
Role: Viewer
```
- Once these properties are set, override the `OpenUrl` action in the `AppDelegate` class:

```csharp
public override bool OpenUrl(UIApplication app, NSUrl url, NSDictionary options)
{
    Device.BeginInvokeOnMainThread(
    async () =>
    {
        try
        {
            await AppService.HandleUrlActivationAsync(url.ToString());
            Debug.WriteLine("IPC Msg Handling Completed");
        }
        catch (Exception ex) {
            Debug.WriteLine($"Error: {ex.Message}");
        }
    });
    return true;
}
```
<br />

**Shared Code: Process response**
* Once you get the response, decode it to check if the request was granted or denied. If granted, use the `AppRegisteredAsync` API to establish a session with the network. Implement this in `HandleUrlActivationAsync(string url)` in the `AppService` class:

```csharp
var encodedRequest = UrlFormat.GetRequestData(url);
var decodeResult = await Session.DecodeIpcMessageAsync(encodedRequest);
if (decodeResult.GetType() == typeof(AuthIpcMsg))
{
    var ipcMsg = decodeResult as AuthIpcMsg;

    if (ipcMsg != null)
    {
        _session = await Session.AppRegisteredAsync(Constants.AppId, ipcMsg.AuthGranted);
        MessagingCenter.Send(this, MessengerConstants.NavigateToItemPage);
    }
    else
    {
        Console.WriteLine("Auth Request is not Granted");
    }
}
```
<br />
Now run the application and authenticate it using the SAFE Authenticator. Once you allow the app to access the network, all operations will be performed on the Alpha-2 network.
