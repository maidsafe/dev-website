# SAFE Android App Tutorial

In this tutorial we will be building an Android application using Java for the SAFE network.

## Tutorial video
<a href="/video#android">
<img src="https://i.postimg.cc/xCrwKQsG/Tutorial-Java.png" alt="Java Tutorial - Android Studio" style="width: 100%"/>
</a>


To create this application we will be using the `safe-app-android` package.

## Prerequisites

- **Git:** To fetch the boilerplate code and for version control.
- **Android Development Setup:** An installation of Android Studio with the necessary JDK and Android SDK.
- **An Android Device / Emulator:** To test/run the application.

Note: We only support devices with armeabi-v7a/x86_64 support and Android API 24 and above.

## Setup the basic skeleton

The basic setup of the application is available in a git repository. Let's get started by cloning this repository

```
git clone https://github.com/maidsafe/safe-getting-started-android
cd safe-getting-started-android
git checkout boilerplate
```

Now import this project into your Android Studio IDE. The required dependencies will be installed. Please give appropriate permissions when required.

## Adding the safe-app-android library

There are two packages available to develop applications for the SAFE Network. `safe-app-android` for the alpha-2 / local network and `safe-app-android-dev` for mock routing. For easier switching between mock and non-mock versions, we have made use of the [build variants](https://developer.android.com/studio/build/build-variants) feature of Android Studio. We have defined mock and nonMock variants and have added the required dependency as follows in the [`app/build.gradle`](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/build.gradle#L32) file.

```
android {
    ...
    flavorDimensions "app"
    productFlavors {
        mock {
            dimension "app"
        }
        nonMock {
            dimension "app"
        }
    }

}

dependencies {
    mockImplementation 'net.maidsafe:safe-app-android-dev:0.1.0'
    nonMockImplementation 'net.maidsafe:safe-app-android:0.1.0'
    ...
}
```

The API documentation for the safe-app-android library is available at [docs.maidsafe.net/safe_app_java](https://docs.maidsafe.net/safe_app_java).

## Authenticating the app

A SAFE application needs to get an authorisation from the user before being able to connect to the network, this is achieved by sending an authorisation request to the Authenticator.

To create an `AuthReq` the following is created:

- An instance of `App` which will hold all the basic information about the application.
- An `AppExchangeInfo` instance which holds all application info that is shared with the Authenticator.
- An array of `ContainerPermissions` which specifies the permissions for various containers. Here we do not need access to any of the containers(except the App's container), hence we pass an empty array.

```
App app = new App("net.maidsafe.sample", "Safe ToDo", "Maidsafe.net", "0.1.0");
```
_The app variable is globally available in the `SafeTodoService` class._

In this tutorial application the `AuthReq` is created and encoded in the `generateAuthURL()` function in the `SafeTodoService` class. Add the following logic that returns the auth URI as a string.

```
final String AUTH_URL_PREFIX = "safe-auth://";
AppExchangeInfo appExchangeInfo = new AppExchangeInfo(app.getId(), "", app.getName(), app.getVendor());
ContainerPermissions[] permissions = new ContainerPermissions[0];
```

We can now create an `AuthReq` using the above
```
AuthReq authReq = new AuthReq(appExchangeInfo, true, permissions, permissions.length, 0);
```

Before calling any of the APIs from native code, we must load the native libraries into memory using `Client.load(context)`. This is done in the [`getInstance()`](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/services/SafeApi.java#L36) function of the `SafeApi` class.

To send the request to the Authenticator the `authReq` is encoded and prepended with `safe-auth://<app_id>/`. This is the URI that will be opened to send the request to the Authenticator.

```
Request request = Client.encodeAuthReq(authReq).get();
return AUTH_URL_PREFIX + app.getId() + '/' + request.getUri();
```

At any point in the tutorial you can use the safe-getting-started-android repository's [master branch](https://github.com/maidsafe/safe-getting-started-android/tree/master) as reference for the function definitions.

## Mock Authentication

For mock authentication there is a helper function available in the boilerplate that will mock the actions of the SafeAuthenticator. This will create an account on the mock network and authenticate the above generated request.

## Creating a Client session

The auth response from the authenticator comes in the format `<app_id>://<app_id>/<encoded_auth_response>`. We strip `<app_id>://<app_id>/` from the URI and pass the encoded auth response to the `connect()` function in the `SafeApi` class. Let us implement this `connect()` function to establish a connection to the SAFE Network. We can start by decoding the encoded auth response and checking if the response is of `AuthResponse` type. We can now create a session object by calling the `connect()` API.

```
this.appId = applicationId;
final DecodeResult decodeResult = Session.decodeIpcMessage(response).get();
if (decodeResult.getClass().equals(AuthResponse.class)) {
    final AuthResponse authResponse = (AuthResponse) decodeResult;
    session = Client.connect(applicationId, authResponse.getAuthGranted()).get();
    session.setOnDisconnectListener(onDisconnected);
    Log.i("STAGE:", "Connected to the SAFE Network");
} else {
    throw new java.lang.Exception("Could not connect to the SAFE Network");
}
```

## Handling network disconnections

There are situations when the application may lose its connectivity to the SAFE network. For example, when the mobile device loses its internet connection. In such cases a disconnected event is fired from native code. The `OnDisconnected` interface contains a method that will be executed when the disconnection event occurs. This action for the disconnected event is defined in the [`TodoActivity` class](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/view/TodoActivity.java#L61). The `OnDisconnected` interface is implemented in the `SafeTodoService` class and the instance is passed to the `SafeApi.connect()` function. You can observe that the onDisconnectedListener is set after calling the `connect` API.

```
session.setOnDisconnectListener(onDisconnected);
```

## Mutable Data operations

#### Creation <br><br>

One of the native data types of the SAFE Network is `MutableData`. MutableData is a key-value store which can be created at either a specific address on the network, or just at a random address, and it can be publicly available (a public MutableData) or otherwise have all its content encrypted (private MutableData). It also has a type associated to it (type tag) which is a number that can be chosen at the moment of creating the MutableData.

We are not going to go into the other aspects of MutableData here, we will just create MutableData in the network to store the data of our application. Please refer to the [discover page](/discover) to learn more about the MutableData type as well as the other types of data available in the SAFE Network.

In this tutorial we are going to create private MutableData at random addresses. Each piece of data stored on the network has its own unique 256 bit address in the network, we will request the API to generate a random address for our new private MutableData:

This mutable data creation is done in the `newMutableData(tagType)` function in the `SafeApi` class.

```
return session.mData.getRandomPrivateMData(tagType).get();
```

This mDataInfo contains all the information about the mutable data and it is used to perform all operations on the data.

In this application, we will be storing instances of `Task` and `TodoList` in the mutable data. The keys and values stored in the mutable data are of type `byte[]`. We can serialise and deserialise the objects using the helper functions provided in the boilerplate.

#### A note about handles <br><br>

Going forward, we will be using instances of `NativeHandle` in a number of places. A `NativeHandle` is an address that points to an instance of complex data types in native code. We use these handles whenever we need to manipulate these instances.

#### Inserting Entries <br><br>

Since the `mDataInfo` obtained is randomly generated there will be no data existent in the location that it points to. So, when we `PUT` the mutable data for the first time to the network, we must first insert a permission set into a `permissionHandle`, with the public key of the application. Now we can `PUT` this mutable data on the network using the `MData.put()` API. Since we are inserting only permissions we can use `Constants.MD_ENTRIES_EMPTY` in place of the entries handle. Let us implement this in the `insertPermissions(MDataInfo mdInfo)` function in the `SafeApi` class.

```
final PermissionSet permissionSet = new PermissionSet();
permissionSet.setInsert(true);
permissionSet.setUpdate(true);
permissionSet.setRead(true);
permissionSet.setDelete(true);
final NativeHandle permissionHandle = session.mDataPermission.newPermissionHandle().get();
session.mDataPermission.insert(permissionHandle, session.crypto.getAppPublicSignKey().get(), permissionSet).get();
session.mData.put(mDataInfo, permissionHandle, Constants.MD_ENTRIES_EMPTY).get();
```

Once the MData is PUT to the network, we can encrypt key-value pairs and insert them as entries by mutating the data in the `addEntry()` function of the `SafeApi` class.

```
final byte[] encryptedKey = session.mData.encryptEntryKey(mDataInfo, key).get();
final byte[] encryptedValue = session.mData.encryptEntryValue(mDataInfo, value).get();
final NativeHandle actionHandle = session.mDataEntryAction.newEntryAction().get();
session.mDataEntryAction.insert(actionHandle, encryptedKey, encryptedValue).get();
session.mData.mutateEntries(mDataInfo, actionHandle).get();
```
<br>
#### Reading Entries <br><br>

Now that we have data on the network, let us add a function to read it. To get the list of entries, get an entry handle for the `mDataInfo` and call the `mDataEntries.listEntries()` API. We will implement this in the `getEntries()` function of the `SafeApi` class.

```
final NativeHandle entryHandle = session.mData.getEntriesHandle(mDataInfo).get();
return session.mDataEntries.listEntries(entryHandle).get();
```
<br>
#### Decryption <br><br>

In this tutorial, the key-value pairs are encrypted and stored in the MutableData. In order to decrypt the values inserted use the following decrypt API in the `decryptEntryValue()` function in the `SafeApi` class.

```
return session.mData.decrypt(mDataInfo, mDataEntry.getValue().getContent()).get();
```
<br>
#### Updating an entry <br><br>

Each entry in a MutableData has a numeric version associated to it. When you insert a new entry it is inserted with version 0, and every time a mutation is performed you need to specify the subsequent version the entry is being bumped to. This is used by the network to ensure that only one mutation is applied when simultaneous mutations requests were received for the same version of an entry, making sure the state change of such an entry is effectively what the originator of a request was intending to do.

So, to update an existing entry in the mutable data, we will use the update entry action by passing the existing encrypted key, the new data which is encrypted, and the version of the `MDataEntry` incremented by one. Let's add the logic to the `updateEntry()` function in the `SafeApi` class.

```
final byte[] encryptedKey = session.mData.encryptEntryKey(mDataInfo, key).get();
final byte[] encryptedValue = session.mData.encryptEntryValue(mDataInfo, newValue).get();
final NativeHandle actionHandle = session.mDataEntryAction.newEntryAction().get();
session.mDataEntryAction.update(actionHandle, encryptedKey, encryptedValue, version).get();
session.mData.mutateEntries(mDataInfo, actionHandle).get();
```
<br>
#### Deleting an entry <br><br>

When you remove an entry it is never deleted from the MutableData, but its value is just cleared, so you cannot insert a new entry with same key, rather you should update it. This is the reason that in our implementation of the [`SafeTodoService.fetchListItems()`](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/services/SafeTodoService.java#L104) and [`SafeTodoService.fetchSections()`](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/services/SafeTodoService.java#L76) functions we filter the deleted entries with the following condition when iterating through them:

```
if (entries.get(i).getValue().getContentLen() != 0)
```

To delete an entry in the mutable data, we can use the delete entry action by passing the encrypted key of the entry to be deleted. Note, that the delete action also requires the `entryVersion + 1` as a parameter. The delete action invokes the `deleteEntry()` function in the `SafeApi` class.

```
final byte[] encryptedKey = session.mData.encryptEntryKey(mDataInfo, key).get();
final NativeHandle actionHandle = session.mDataEntryAction.newEntryAction().get();
session.mDataEntryAction.delete(actionHandle, encryptedKey, version).get();
session.mData.mutateEntries(mDataInfo, actionHandle).get();
```

Here, the version increment is done in the [`SafeTodoService.deleteTask()`](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/services/SafeTodoService.java#L126) function *before* calling the Safe API.

#### Making use of the App's Container <br><br>

Since the `appData` we work with is randomly generated, a different `appData` is generated every time the app starts and consequently the entries made in the previous mutable data will be lost. Thus, we need to store this `appData` in a location that is accessible by the application. For this, we can use the App's Container. The app's container is mutable data that is exclusive per app per user. To obtain the `appData` info for the application:
```
MDataInfo appContainerInfo = session.getContainerMDataInfo(APP_CONTAINER_NAME + appId).get();
final byte[] encryptedKey = session.mData.encryptEntryKey(appContainerInfo, LIST_KEY.getBytes()).get();
MDataValue mDataValue = session.mData.getValue(appContainerInfo, encryptedKey).get();
final byte[] serializedMdInfo = session.mData.decrypt(appContainerInfo, mDataValue.getContent()).get();
info  = session.mData.deserialise(serializedMdInfo).get();
```

We can serialise, encrypt and store the `appData` in the App Container so that we can re-use the mutable data that was randomly generated the first time the app is launched.

So, when the application starts, we should first check for existent `appData` in the App's Container, fetch, decrypt and deserialise it. If the data does not exist, then we create a new mutable data, that is encrypted and stored in the app's container. This logic is implemented in the [`getSectionsFromAppContainer()`](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/services/SafeApi.java#L58) function in the `SafeApi` class. This function is called after establishing a connection to the SAFE network.

If you now run the application it will perform the mutable data operations that we have implemented via the APIs.

## Migrating to the Alpha-2 network

So far, all the network operations are being performed on the mock network. You can find more information about the different types of networks in the [discover page.](/discover) For the test network, the application will be authorising with the SAFE Authenticator to get the credentials needed to then connect to the SAFE Network.

#### Installing the SAFE Authenticator <br><br>

You can find the links to download the SAFE Authenticator package from the [GitHub releases](https://github.com/maidsafe/safe-authenticator-mobile/releases). Download the app and install it on your Android Device / Emulator. Open the application and login using your SAFE Network credentials.

#### Registering a custom URI for the application <br><br>

When the Authenticator completes the authorisation, it starts the ToDo application from a custom URI. This URI is of the format `<app_id>://<app_id>/<encoded_auth_response>`. This URI scheme is added as an intent-filter in the [application's manifest file.](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/AndroidManifest.xml#L24)

```
<intent-filter>
  <data android:scheme="net.maidsafe.sample" />
</intent-filter>
```

Now any URI of the mentioned scheme, when opened, will launch our application with the URI as intent data. The following code in the [TodoActivity class](https://github.com/maidsafe/safe-getting-started-android/blob/master/app/src/main/java/net/maidsafe/sample/view/TodoActivity.java#L96) will fetch the data from the intent and establish a connection.

```
final Intent intent = getIntent();
final Uri data = intent.getData();
if(data != null) {
    sectionViewModel.connect(data, onDisconnected);
}
```

Before running the application switch the build variant to nonMockDebug and then start the app. Now on clicking the Authenticate button you will be redirected to the Authenticator application. Once you allow the app to authenticate you will be redirected back to the app and the connection will be established. Now all operations performed, would send / receive data from the Alpha-2 Network.
