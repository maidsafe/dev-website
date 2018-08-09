# SAFE Mobile App Tutorial

In this tutorial, we will create a [Xamarin.Forms](https://github.com/xamarin/Xamarin.Forms/) application. Xamarin.Forms is an open source and cross-platform tool which provides a way to quickly build native apps for iOS, Android, Windows and macOS using C# and F#.

To create this app, we will use the [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) NuGet package which exposes the `safe_app` API to connect and interact with the SAFE Network.

Download demo code for this tutorial from [here](https://github.com/maidsafe/safe-getting-started-dotnet/SafeTodoExample).

## Pre-requisites

Before we start working on our first SAFE app, make sure you have the following tools installed to work with this tutorial.

- **Visual Studio with Xamarin**: You need Visual Studio (any edition) to build our first SAFE Network mobile application. Follow the instructions [here](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/get-started/installation) to download and install visual studio with Xamarin.Forms for your Operating System.
- **SafeAuthenticator**: Safe Authenticator mobile application will be required to initiate the authentication process with SAFE Network. Please follow installation instruction [here](https://github.com/maidsafe/safe_mobile#Installation).

## Setup basic project

- Create a new Project: Create a new cross-platform mobile app (Xamarin.Forms) project in visual studio.
- Install MaidSafe.SafeApp package: Install the latest version of [MaidSafe.SafeApp](https://www.nuget.org/packages/MaidSafe.SafeApp/) package in all projects using NuGet package 

## Using Mock Network

We provide the mock feature with Safe APIs which can be used for fast app development and, also provides a safe space to perform test operations. 

When we use the mock feature in an application, it does not communicate with the live network. Instead, it will interface with a local MockVault file in the system to simulate network operations, which is used to store and retrieve data. Let's see how we can set up and use a mock network.

- Build conditional compilation symbols: Add `SAFE_APP_MOCK` flag for your project in "Properties > Build > Conditional compilation symbols".

Once we set this flag in build settings, a reference to `SafeApp.MockAuthBindings.dll` will be added into the project automatically. It has Additional classes and functions used for mock authentication. We can use any of the following processes for mock authentication based on our requirement.

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
var session = await Session.AppRegisteredAsync(appId, authResponse.AuthGranted);
```

## Connecting to Test SAFE Network

To be able to connect to the SAFE Network, a SAFE application needs to get an authorisation from the user, this is achieved by sending an authorisation request to the Authenticator (Safe Authenticator app in this case).

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

Once the `AuthReq` instance is initialised, we can use it to generate the authorisation request and send it to the Authenticator using following code:
```csharp
(uint, string) encodedReq = await Session.EncodeAuthReqAsync(authReq);
var url = $"safe-auth://{AppId}/{encodedReq}";
Device.BeginInvokeOnMainThread(() => { Device.OpenUri(new Uri(url)); });
```
Make sure you have Authenticator App installed and logged in before running the application.

Once app request is sent, you would notice that Safe Authenticator app is launched and a pop-up dialogue is prompting for access. At this point, you can allow or deny the request, and the Authenticator will send the response back to the application. 

Safe Authenticator application already has the code to process the request and send the response according to user dialogue feedback using the URI scheme, the os will match the URI scheme to our application, and it will launch our application passing the `EncodedAuthResponse` as an argument. We will need to follow some extra steps to extract and use the response from the authenticator. Follow these steps for the respective mobile os.

- Android: We use Intent Filter, so our app can respond to urls. We will add an `IntentFilter` parameter in `MainActivity` attribute. After making this change `MainActivity` should match the following code.

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

Once this property is set we need to override the `OnNewIntent` action in `MainActivity` to perform next action.

```csharp
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

- iOS: We use URL Types Registration feature available in `info.plist` file. We can add it using ui editor or in xml editor. Open `Info.plist` in ui editor and open `Advanced > URL Types > Add URL Type` and add following properties.

```csharp
Identifier: YOUR_APP_NAME
URL Schemes: URL_TO_REGISTER
Role: Viewer
```
Once these properties are set then we need to override the `OpenUrl` action in `AppDelegate`.

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
Learn how to work with Mutable data on the Safe Network [here](/platform/dotnet#create-a-public-mutable-data).
