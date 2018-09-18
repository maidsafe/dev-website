# SAFE Mobile App Tutorial

In this tutorial we will create a [Xamarin.Forms](https://github.com/xamarin/Xamarin.Forms/) application. Xamarin.Forms is an open source, cross-platform tool which provides a way to quickly build native apps for iOS, Android, Windows and macOS using C# and F#.

To create this app we will use the [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) NuGet package which exposes the SAFE APIs to connect and interact with the SAFE Network.

You can download working example code from [here](https://github.com/maidsafe/safe-getting-started-dotnet/SafeTodoExample) or follow the steps described in this tutorial to create an app for SAFE Network.

## Pre-requisites

Before we start working on our first SAFE app, make sure you have the following tools installed:

- **Visual Studio**:
Follow the instructions [here](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/installation) to download and install Visual Studio (any edition) with Xamarin.Forms for your operating system.
- **Safe Authenticator**:
The Safe Authenticator mobile application is required to initiate the authentication process with the SAFE Network. Installation instructions can be found [here](https://github.com/maidsafe/safe_mobile#Installation).
- **Beginner level knowledge of Xamarin.Forms**:
An introduction to Xamarin.Forms can be found [here](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/introduction-to-xamarin-forms)  

## Set up a basic project

- Create a new **cross-platform mobile app (Xamarin.Forms)** project in Visual Studio.
- Install the latest version of [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) package in all projects using NuGet package manager. 

## Using a Mock Network

We provide the `mock` feature with SAFE APIs which provides for fast app development and a safe space to perform test operations. 

When the `mock` feature is used it does not communicate with the live SAFE network. Instead, it interfaces with a local MockVault file to simulate network operations, which is used to store and retrieve data. To set up and use a mock network:

**1. Build conditional compilation symbols:**
- Add `SAFE_APP_MOCK` flag to your project in **Properties** > **Build** >   **Conditional compilation symbols** .
- Add the flag to the platform specific projects.

Once this flag is set in the build settings, a reference to `SafeApp.MockAuthBindings.dll` will be added to the project automatically which has additional classes and functions used for mock authentication. Now the following process can be used for mock authentication:

**2. Create a mock user account and login using the same credentials:**
Here is example code which can use for mock authentication:

```csharp
var location = "UserName";
var password = "Password";
var invitation = "Invitation";
var authenticator = await Authenticator.CreateAccountAsync(location, password, invitation);
authenticator = await Authenticator.LoginAsync(location, password);
```

**3. Generate `EncodedAuthRequest`**

Once we have an authenticator object we need will an `AuthReq` instance to generate `EncodedAuthRequest` which is used for authentication. 

In the code block below, we have `Authenticator.EncodeAuthRespAsync` method which uses two parameters, `AuthIpcReq` and `Response`. `Response` is a boolean type representing whether you want to grant the permissions to an app or not. To grant the permissions use true, otherwise false. Once response is received, it is decoded and then registers the app:
```csharp
public const string AppId = "net.maidsafe.examples.todo";
public const string AppName = "Safe Todo";
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo 
    { 
        Id = AppId, 
        Scope = "", 
        Name = AppName, 
        Vendor = "MaidSafe.net Ltd." 
    },
    Containers = new List<ContainerPermissions> 
    { 
        new ContainerPermissions 
        { 
            ContName = "_publicNames", Access = { Insert = true, Update = true, Delete = true } 
        }
    }
};
var (_, reqMsg) = await Session.EncodeAuthReqAsync(authReq);
var ipcReq = await authenticator.DecodeIpcMessageAsync(reqMsg);
var authIpcReq = ipcReq as AuthIpcReq;
var resMsg = await authenticator.EncodeAuthRespAsync(authIpcReq, true);
var ipcResponse = await Session.DecodeIpcMessageAsync(resMsg);
var authResponse = ipcResponse as AuthIpcMsg;
var session = await Session.AppRegisteredAsync(AppId, authResponse.AuthGranted);
```

## Connecting to the live network

*Note: Ensure `SAFE_APP_MOCK` flag is removed from shared and platform specific projects.*

To connect to the live SAFE Network, a SAFE application needs to get authorisation from the user. This is achieved by sending an authorisation request to the Authenticator (SAFE Authenticator app in this case): 

**1. Generate an `AuthReq` instance**

We first need to generate an `AuthReq` instance which provides information about the application and the permissions requested by this application. These details will be displayed in the authenticator:

```csharp
public const string AppId = "net.maidsafe.examples.todo";
public const string AppName = "Safe Todo";
var authReq = new AuthReq
{
    AppContainer = true,
    App = new AppExchangeInfo 
    { 
        Id = AppId, 
        Scope = "", 
        Name = AppName, 
        Vendor = "MaidSafe.net Ltd." 
    },
    Containers = new List<ContainerPermissions> 
    { 
        new ContainerPermissions 
        { 
            ContName = "_publicNames", Access = { Insert = true, Update = true, Delete = true } 
        }
    }
};
```
***Note:** Passing a list of `ContainerPermissions` allows the definition of various permissions provided to specific containers.*

**2. Send `AuthReq` to the Authenticator**

*Note: Make sure you have Authenticator App installed and logged in before running the application ([see pre-requisites](#pre-requisites)).*

After the `AuthReq` instance is initialised it is then used to generate the authorisation request and sends it to the Authenticator using the following code:
```csharp
(uint, string) encodedReq = await Session.EncodeAuthReqAsync(authReq);
var url = $"safe-auth://{AppId}/{encodedReq.Item2}";
Device.BeginInvokeOnMainThread(() => { Device.OpenUri(new Uri(url)); });
```
**3. Grant access**

Once the authorisation request is received the Authenticator launches and a pop-up dialogue prompts for access (Allow or Deny).The Authenticator then sends the response back to the application using the URI scheme. The OS matches the URI scheme to the application and launches the application passing `EncodedAuthResponse` as an argument. 

**4. Use the response**

To extract and use the response from the Authenticator follow these steps for the respective mobile OS:

**Android: Use `IntentFilter` so the app can respond to the URL** 
- Add an `IntentFilter` parameter in the `MainActivity` attribute. After making this change `MainActivity` should match the following code:
```csharp
[Activity(
    Label = "SafeTodoExample",
    Icon = "@mipmap/icon",
    Theme = "@style/MainTheme",
    MainLauncher = true,
    ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation),
    IntentFilter(
        new[] { Intent.ActionView },
        Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
        DataScheme = "YOUR_URL_SCHEME"
    )]
```
- Once this property is set, update `OnCreate` method and override the `OnNewIntent` action in `MainActivity` to perform the next action:

```csharp
protected override void OnCreate(Bundle savedInstanceState)
{
    // Add following code under LoadApplication(new App());
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

private void HandleAppLaunch(string url)
{
    System.Diagnostics.Debug.WriteLine($"Launched via: {url}");
    Device.BeginInvokeOnMainThread(
        async () =>
        {
            try
            {
                // Send the url to decode the response and initialize new session (if granted).
                // Explained in next section

                System.Diagnostics.Debug.WriteLine("IPC Msg Handling Completed");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error: {ex.Message}");
            }
        });
}
```

**iOS: Use the URL Types Registration feature**

The URL Types Registration feature, available in `info.plist` file, can be added using the UI editor or in the XML editor: 

- Open `Info.plist` in editor and open `Advanced > URL Types > Add URL Type` and add following properties:

```csharp
Identifier: YOUR_APP_NAME
URL Schemes: URL_TO_REGISTER
Role: Viewer
```
- Once these properties are set, the `OpenUrl` action in `AppDelegate` needs to be overwritten:

```csharp
public override bool OpenUrl(UIApplication app, NSUrl url, NSDictionary options) 
{
    Device.BeginInvokeOnMainThread(
    async () => {
        try 
        {
            // Code to decode the response and initialize new session (if granted).
            // Explained in next section

            Debug.WriteLine("IPC Msg Handling Completed");
        } 
        catch (Exception ex) {
            Debug.WriteLine($"Error: {ex.Message}");
        }
    });
    return true;
}
```

* Once the response is received, it is decoded and checked to see if the request was granted or denied. If granted, initialize a new session to communicate with SAFE Network:

```csharp
var encodedRequest = new Uri(url).PathAndQuery.Replace("/", "");
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
Learn how to work with Mutable data on the SAFE Network [here](/platform/dotnet#create-a-public-mutable-data).
