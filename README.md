# This app is hosted here: https://gl-labs-swapi-playground.web.app/
*_remember to clear cache_

# Global dependencies

* Node (Tested using v14.17.0)

```
npm i -g typescript eslint prettier @ionic/cli @angular/cli @capacitor/cli
```

# Getting Started

Install the modules
```
npm i
```

Running in the browser
```
ionic serve
```

Running on Android
```
npx cap open android
```

# Building and Deployment

**Important**:

Check/Adjust the value for `parseServerUrl` in `src\app\app.constants.ts` correspondingly before going further.
## PWA

Generate the production bundle
```
ionic build --prod
```
This generates the `www` folder.

## iOS and Android

Use this to open Xcode/Android Studio, this is where the building/deployment is done.
```
npx cap open ios
npx cap open android
```

Remember to sync your app with Capacitor every time you perform a build (e.g. `ionic build`) that changes your web directory (default: `www`), you’ll need to copy those changes down to your native projects:
```
npx cap copy
```

## Firebase

```
npm i -g firebase-tools
```
> NOTE: backup the firebase.json contained at this ionic project folder, after the init command has been executed, replace the firebase.json created by the backup.


With the Firebase CLI installed run `firebase init` in the project. This will set generate a **firebase.json**
config file and configure the app for deployment.

> firebase init will present a few question, including one about redirecting URLs to /index.html. Make sure to choose YES for this option, but NO to overwriting your index.html. This will ensure that routing, hard reload, and deep linking work in the app.


The app can now be deployed by running
```
npm run firebase-deploy
```

# Extras

If you would like to check which version and packages are installed or any dependencies issue that is
denying to run, tip the command:

```
ionic doctor check
```

# Links

* [Ionic docs](https://ionicframework.com/docs)
* [Capacitor docs](https://capacitorjs.com/docs/)
* [Auto Generate PWA icons](https://github.com/pverhaert/ngx-pwa-icons)
