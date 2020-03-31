# Ethereum Wallet [![Build Status](https://travis-ci.org/fmsouza/ethereum-wallet.svg?branch=master)](https://travis-ci.org/fmsouza/ethereum-wallet)

This project is a Ethereum Wallet built on top of ReactNative.

## Table of Contents

* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm run ios](#npm-run-ios)
  * [npm run android](#npm-run-android)
  * [npm run android:build](#npm-run-android-build)
  * [npm run android:bundle](#npm-run-android-bundle)
  * [npm run android:clean](#npm-run-android-clean)
  * [npm run android:logcat](#npm-run-android-logcat)
* [Writing and Running Tests](#writing-and-running-tests)
* [License](#license)

## Available Scripts

### `npm install`

Installs all dependencies and prepares the app to run.

### `npm start`

Runs Packager to provide your app in development mode.

#### `npm run ios`

Open your app in the iOS Simulator if you're on a Mac and have it installed. Depends on `npm start`.

#### `npm run android`

Open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). Depends on `npm start`.

#### `npm run android:build`

Build the Android app and generate the APK to install on the device.

#### `npm run android:bundle`

Bundles the ReactNative JavaScript code. Run it before running the build command to be able to run the test without depending on the development server.

#### `npm run android:generate-apk`

Bundle and build the Android app.

#### `npm run android:clean`

Clean the Android generated build files.

#### `npm run android:logcat`

Outputs the Android logcat to the cli, so you can see native the logs in runtime.
