# SAFE Mobile App Tutorial

In this tutorial, we will create a [Xamarin.Forms](https://github.com/xamarin/Xamarin.Forms/) application. Xamarin.Forms is an open source and cross-platform tool which provides a way to quickly build native apps for iOS, Android, Windows and macOS using C# and F#.

To create this app, we will use the [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) NuGet package which exposes the SAFE APIs to connect and interact with the SAFE Network.

Download working example code for from [here](https://github.com/maidsafe/safe-getting-started-dotnet/SafeTodoExample). Follow the steps described in this tutorial to create an app for SAFE Network.

## Pre-requisites

Before we start working on our first SAFE app, make sure you have the following tools installed to work with this tutorial:

- **Visual Studio with Xamarin**: You need Visual Studio (any edition) to build our first SAFE Network mobile application. Follow the instructions [here](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/installation) to download and install visual studio with Xamarin.Forms for your Operating System.
- **SafeAuthenticator**: Safe Authenticator mobile application will be required to initiate the authentication process with SAFE Network. Please follow installation instructions [here](https://github.com/maidsafe/safe_mobile#Installation).
- Beginner level knowledge of Xamarin.Forms.

## Set up a basic project

- Create a new Project: Create a new **cross-platform mobile app (Xamarin.Forms)** project in visual studio.
- Install MaidSafe.SafeApp package: Install the latest version of [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) package in all projects using NuGet package manager. 

## Using Mock Network

We provide the mock feature with SAFE APIs which can be used for fast app development and provides a safe space to perform test operations. 

When we use the mock feature in an application, it does not communicate with the live network. Instead, it will interface with a local MockVault file in the system to simulate network operations, which is used to store and retrieve data. Let's see how we can set up and use a mock network:

- Build conditional compilation symbols: Add `SAFE_APP_MOCK` flag for your project in "Properties > Build > Conditional compilation symbols" and add the flag in to platform specific projects also.

Once we set this flag in build settings, a reference to `SafeApp.MockAuthBindings.dll` will be added into the project automatically. It has additional classes and functions used for mock authentication. We can use the following process for mock authentication:

Following is the example code, we can use for mock authentication.
We create a mock user account and login using the same credentials:

```csharp
var location = "UserName";
var password = "Password";
var invitation = "Invitation";
var authenticator = await Authenticator.CreateAccountAsync(location, password, invitation);
authenticator = await Authenticator.LoginAsync(location, password);
```
Once we have an authenticator object we need will an `AuthReq` instance to generate `EncodedAuthRequest` which is used for authentication. In the code block below, we have `Authenticator.EncodeAuthRespAsync` method which uses two parameters, `AuthIpcReq` and `Response`. `Response` is a boolean type representing whether you want to grant the permissions to an app or not. To grant the permissions use true, otherwise false. Once response is received, it is decoded and then registers the app:
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

## Connecting to Live SAFE Network

To be able to connect to the SAFE Network, a SAFE application needs to get an authorisation from the user, this is achieved by sending an authorisation request to the Authenticator (Safe Authenticator app in this case). Remove `SAFE_APP_MOCK` flag (added for mock authentication)  from shared and platform specific projects otherwise authentication process will now work.

We first need to generate an `AuthReq` instance which provides information about the application and, permissions requested by this application. These details will be displayed in the authenticator:

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
Note that we are passing a list of `ContainerPermissions`, this allows us to define the various permissions provided to specific containers.

Once the `AuthReq` instance is initialised, we can use it to generate the authorisation request and send it to the Authenticator using the following code:
```csharp
(uint, string) encodedReq = await Session.EncodeAuthReqAsync(authReq);
var url = $"safe-auth://{AppId}/{encodedReq.Item2}";
Device.BeginInvokeOnMainThread(() => { Device.OpenUri(new Uri(url)); });
```
Make sure you have Authenticator App installed and logged in before running the application ([see pre-requisites](#pre-requisites)).

Once the app authentication request is sent, you will notice that the Safe Authenticator app is launched and a pop-up dialogue is prompting for access. At this point, you can allow or deny the request, and the Authenticator will send the response back to the application. 

The Safe Authenticator application already has the code to process the request and send the response according to user dialogue feedback using the URI scheme, the OS will match the URI scheme to our application, and it will launch our application passing the `EncodedAuthResponse` as an argument. We will need to follow some extra steps to extract and use the response from the authenticator. Follow these steps for the respective mobile OS:

- Android: We use Intent Filter, so our app can respond to URL. We will add an `IntentFilter` parameter in the `MainActivity` attribute. After making this change `MainActivity` should match the following code:

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

Once this property is set we need to update our `OnCreate` method and override the `OnNewIntent` action in `MainActivity` to perform next action:

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

- iOS: We use the URL Types Registration feature available in `info.plist` file. We can add it using UI editor or in XML editor. Open `Info.plist` in editor and open `Advanced > URL Types > Add URL Type` and add following properties:

```csharp
Identifier: YOUR_APP_NAME
URL Schemes: URL_TO_REGISTER
Role: Viewer
```
Once these properties are set then we need to override the `OpenUrl` action in `AppDelegate`:

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

Once we get the response, we decode it and check whether the request was granted or denied. If the request was granted we will initialize a new session to communicate with SAFE Network.

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
