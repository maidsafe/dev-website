# SAFE Desktop App Tutorial

In this tutorial, we will create an [Electron](https://electronjs.org) application. Electron allows you to create and build cross-platforms desktop applications using JavaScript.

To create this app we will use the [@maidsafe/safe-node-app](https://www.npmjs.com/package/@maidsafe/safe-node-app) npm package to interact with the SAFE Authenticator. To connect with the SAFE Network we will interface with the `safe-app-nodejs` API. 

We are going to use our [SAFE App Electron quick start](https://github.com/bochaco/safe-app-electron-quick-start) boilerplate, which is based on the [Electron quick start](https://github.com/electron/electron-quick-start) boilerplate.

If you would like additional information on creating Electron applications, visit the [Electron tutorial](https://electronjs.org/docs/tutorial) site. 

// TODO: brief about the Angular usage in the boilerplate and the app itself

## Pre-requisites

First you need to make sure you have the following tools installed to be able to work with this tutorial:
- [git](https://git-scm.com/): to be able to clone the boilerplate code
- [Node.js](https://nodejs.org/en/download) (which comes with [npm](http://npmjs.com/)) to be able to run the application since it's a Node.js application.

Since the application will be authorising with the Authenticator to get the credentials needed to then connect to the SAFE Network, we first need to have an instance of the SAFE Browser installed. We recommend you download and install the SAFE Browser package that is built to work with the mock network for this tutorial:
- TODO: Where to download the browser from (for mock, with MockVault), and how to run it.
- TODO: how to log in with the already created account, or how to create an account.

## Create basic skeleton

// TODO: clone a tag which doesn't contain all the code, as we can publish all the code ready to run

We first clone the boilerplate repo using `git` onto a local folder named `hello-safe-network`:
```bash
$ git clone https://github.com/bochaco/safe-app-electron-quick-start hello-safe-network
```

// TODO: explain about NODE_ENV=dev for mock or create scripts in the boilerplate
```bash
$ export NODE_ENV=dev
```

And then install its dependencies:
```bash
$ cd hello-safe-network
$ npm install
```

At this point we have an Electron application ready to be launched, let's run it:
```bash
$ npm start
```

You should see a "Hello SAFE Network!" message in our app's window and an empty list of trips. We are now ready to start creating the code to be able to store the planned trips into the SAFE Network.

## Import the SAFE API
The application will interact with the SAFE Network using the `safe-node-app` package, we therefore need to add it as a dependency in our package:
```bash
$ npm install @maidsafe/safe-node-app --save
```

Any interaction with the SAFE Network is made thru the API imported from the `safe-node-app` package, we do this by adding a `require` statement at the top of the `safenetwork.js` file:
```js
const safeNodeApp = require('@maidsafe/safe-node-app');
```

## Send authorisation request to the Authenticator
A SAFE application needs to get an authorisation from the user before being able to connect to the network, this is achieved by sending an authorisation request to the Authenticator.

We first need to generate a `SAFEApp` instance by calling the `initialiseApp` function of the API, providing information about the application (this information is displayed to the user when requesting the authorisation):
```js
let appInfo = {
  name: 'Hello SAFE Network',
  id: 'net.maidsafe.tutorials.nodejs',
  version: '0.1.0',
  vendor: 'MaidSafe.net Ltd.',
  customExecPath
};
let safeApp = await safeNodeApp.initializeApp(appInfo);
```

//TODO: explain about customExecPath

We are using `await` to call the `initialiseApp` function since it's asynchronous as most of the functions exposed by the `safe-app-nodejs` API. You can also use JavaScript `Promises` if you prefer.

Once the `safeApp` instance is initialised, we can use it to generate the authorisation request and send it to the Authenticator:
```js
const authUri = await safeApp.auth.genAuthUri({});
await safeApp.auth.openUri(authUri);
```
Note that we are passing an empty object as argument to the `genAuthUri` function, this object can contain a list of permissions to access different containers, but for the sake of simplicity we are not doing it here with this application. More details can be found in [this section](???)

Let's make all the code for these steps to be the body of the function called `sendAuthReq` in the `safenetwork.js` file, it should now look like this:
```js=1
const safeNodeApp = require('@maidsafe/safe-node-app');
const electron = require('electron');
const app = require('electron').remote.app;

const customExecPath = [process.execPath, app.getAppPath()];
let safeApp;

async function sendAuthRequest() {
  console.log('Authorising SAFE application...');
  let appInfo = {
    name: 'Hello SAFE Network',
    id: 'net.maidsafe.tutorials.desktop-app',
    version: '0.1.0',
    vendor: 'MaidSafe.net Ltd.',
    customExecPath
  };
  safeApp = await safeNodeApp.initializeApp(appInfo);
  const authUri = await safeApp.auth.genAuthUri({});
  await safeApp.auth.openUri(authUri);
}
...
```
As you can see, we declare the `safeApp` variable outside the function since we will be using this same `SAFEApp` instance to access the API from other functions.

The `sendAuthReq` function is invoked when the application's window is loaded, this is part of the code we inherited with the boilerplate. You can look at the code in `controller.js` if you are interested in it.

We can now launch our application again to verify that now it's able to generate the authorisation request and send it to the Authenticator. Make sure you launch the SAFE Browser and log in using the Authenticator ([see the pre-requisites section]()) before running the application:
```bash
$ npm start
```

You should have had the Authenticator to show a pop-up with the authorisation request with the information of the application. 

At this point you can allow or deny the request, and the Authenticator will send the response back to the application. The boilerplate code already contains the code to receive the response, the `uponAuthResponse` function in the `safenetowrk.js` file will be invoked with the authorisation URI the Authenticator sent:
```js
async function uponAuthResponse(resAuthUri) {
}
```

## Connecting to the SAFE Network
We can now use the authorisation URI we received from the Authenticator to connect to the SAFE Network. In order to do this we simply call the `loginFromUri` API function:
```js
await safeApp.auth.loginFromURI(resAuthUri);
```

This function will decode the authorisation URI and create a connection with the SAFE Network using the credentials obtained from it.

## Create a public MutableData
One of the native data types of the SAFE Network is the `MutableData`. A MutableData is a key-value store which can be created at either a specific address on the network, or just at a random address, and its can be publicly available (a public MutableData) or otherwise have all its content encrypted (private MutableData). It also has a type associated to it (type tag) which is a number that can be chosen at the moment of creating the MutableData.

We are not going to go into the other aspects of the MutableData here, we will just create MutableData in the network to store the data of our application. Please refer to the ["Discovery" section]() to learn more about the MutableData type as well as the other types of data available in the SAFE Network.

In this tutorial we are going to create a public MutableData at a random address. Each piece of data stored on the network has its own unique 256 bits address in the network (you can read more about XoR addresses of the SAFE Network [here]()), we will request the API to generate a random address for our new public MutableData: 
```js
const typeTag = 15000;
const md = await safeApp.mutableData.newRandomPublic(typeTag);
```

The type tag we are choosing is just a random number here, although you must know there is a range of reserved numbers for the type tags, any MutableData stored with any of this reserved type tags will have a special treatment by the network (please refer to [here]() for more information about the type tags).

At this point we have a MutableData object which was not committed to the network yet, so we can now request the API to send the corresponding request to the SAFE Network to store it:
```js
const initialData = {
  "random_key_1": JSON.stringify({
      text: 'Scotland to try Scotch whisky',
      made: false
    }),
  "random_key_2": JSON.stringify({
      text: 'Patagonia before I\'m too old',
      made: false
    })
};
await md.quickSetup(initialData);
```
We use the `quickSetup` function which allows us to (optionally) provide an initial set of key-value entries that the MutableData shall be populated with when storing it on the network.

// TODO: explain the data entries format

Let's have our app to create this MutableData right after it connects to the network:
```js
let md;

async function uponAuthResponse(resAuthUri) {
  console.log("Authorisation response received");
  
  await safeApp.auth.loginFromURI(resAuthUri);
  console.log("Application connected to the network");
  
  const typeTag = 15000;
  md = await safeApp.mutableData.newRandomPublic(typeTag);
  const initialData = {
    "random_key_1": JSON.stringify({
        text: 'Scotland to try Scotch whisky',
        made: false
      }),
    "random_key_2": JSON.stringify({
        text: 'Patagonia before I\'m too old',
        made: false
      })
  };
  await md.quickSetup(initialData);
}
```

We are declaring the `md` variable outside the function so we can then access this same MutableData from other functions we will be creating in the next steps.

If we run the application again now, it should successfully connect to the network after an authorisation was given, and it will create a random MutableData with some initial data, although we won't see it on the UI yet, so let's now add the code to retrive the values from the MutableData to render it in the UI.

## Read the MutableData entries
We now have our MutableData stored on the network with an initial set of key-value entries, thus we can now retrieve them using the `md` variable we declared global. Let's create the body for `getItems` function in our `safenetwork.js` file:
```js
async function getItems() {
  const entries = await md.getEntries();
  let items = [];
  await entries.forEach((key, value) => {
    if (value.buf.length == 0) return;
    const parsedValue = JSON.parse(value.buf);
    items.push({ key: key, value: parsedValue, version: value.version });
  });
  return items;
};
```

Note we are expecting the value of the entry to be a serialised JSON object, since that's how we stored them when we called the `quickSetup` function before, so we need to de-serialise it with `JSON.parse` before returning it.

We can now run it again and we should be able to see the list of trips we initially stored on the SAFE Network.

## Add more entries to our MutableData
It's time now to allow the user to add new trips to the list by entering them in the little form on the UI.

The MutableData's key-value entries can be mutated by creating a mutation transaction object where we set all the mutation actions we want to apply to the entries:
```js
const mutations = await safeApp.mutableData.newMutation();
```

We can set three different type of mutation actions on the mutation transaction: insert, update, or remove. Let's go ahead and add an "insert" action to add the new entry:
```js
await mutations.insert(key, JSON.stringify(value));
```

Note we are expecting the value argument to be a JSON object, so we serialise it with `JSON.stringify` before adding it to the mutation transaction.

Now we just need to apply this mutation transaction to our MutableData by calling the `applyEntriesMutation` method, let's put all this code into the body of the `insertItem` function:
```js
async function insertItem(key, value) {
  const mutations = await safeApp.mutableData.newMutation();
  await mutations.insert(key, JSON.stringify(value));
  await md.applyEntriesMutation(mutations);
};
```

Let's now run the application and try to add a new trip to the list, the application will insert it in the MutableData and the list will be automatically refreshed on the UI afterwards.

## Update and remove entries
As we saw above, to update or remove entries we just need to create a mutation transaction, with "update" and/or "remove" actions, and apply the mutations to the MutableData. Let's create two new functions called `updateItem` and `removeItem` to perform these mutations on our MutableData:
```js
async function updateItem(key, value, version) {
  const mutations = await safeApp.mutableData.newMutation();
  await mutations.update(key, JSON.stringify(value), version + 1);
  await md.applyEntriesMutation(mutations);
};

async function removeItems(items) {
  const mutations = await safeApp.mutableData.newMutation();
  items.forEach(async (item) => {
    await mutations.remove(item.key, item.version + 1);
  });
  await md.applyEntriesMutation(mutations);
};
```

Note that there is a versioning involved in such mutations, as opposed to "insert" mutations which don't have any. Each entry in a MutableData has a numeric version associated to it. When you insert a new entry it's inserted with version `0`, and every time a mutation is performed you need to specify the subsequent version the entry is being bumped to. This is used by the network to ensure that only one mutation is applied when simultaneous mutations requests were received for the same version of an entry, making sure the state change of such an entry is effectively what the originator of a request was intending to do.

The `removeItems` is invoked when the user selects some of the trips from the list and then clicks on "remove trips already made". As you can see we receive a list of items to be removed and we are able to add a "remove" action for each of them into the mutation transactin before we actually send the mutation request to the netowork when invoking `applyEntriesMutation`. This is to reduce the network traffic needed to perform several mutations on a single MutableData.

Note that the boilerplate code doesn't have the implementation in the UI to be able to update trips, but we jut added the implementation for updating the items on the MutableData entries, so go ahead and try to add the UI commponents to allow the user to do this ;)

## What now?

Just go for a drink man!