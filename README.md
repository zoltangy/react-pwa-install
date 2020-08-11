# react-pwa-install

[![npm package][npm-badge]][npm]
![npm][npm-downloads]

Install handling for your React [PWA].

## The problem this package is trying to solve

Since intalling a PWA (aka [Add to home screen]) is handled differently by different browsers, it's rather hard to give this option to users conveniently. Currently only Chrome, Edge and Samsung Internet support this feature natively using the [BeforeInstallPromptEvent]. On iOS devices, FireFox mobile or Opera mobile the user needs to perform some manual steps to install the app to the home screen. Very few know this option even exists.

## What this package does

This package provides a simple way to add a custom PWA installing capability to your app on several platforms, while not trying to do too much in terms of when and how or how often the install prompt is shown to the user. This is application dependent and should be left for the app developer to define.

- If a user is visiting your PWA from a browser that supports the native [BeforeInstallPromptEvent], then this method will be used for the installation. ( Currently: Chrome - mobile and desktop, Edge - mobile, Samsung internet )
- If a user is visiting your PWA from a browser that supports "manual installation", then instructions will be shown to them. ( Currently iOS devices, FireFox - mobile, Opera - mobile).

## Demo

To view the demo visit: https://zoltangy.github.io/react-pwa-install-demo/ (view [source code]).

## Installation

To use the package, you also need to install @material-ui/core.

```shell
$ npm i --save react-pwa-install @material-ui/core
```

## Prerequisites

Make sure that your [PWA is installable]. You can use Lighthouse from Chrome DevTools to run a PWA Audit.

Please also read [this guide] on best practices to promote the installation of your app.

## Usage

1. Import `ReactPWAInstallProvider` and `useReactPWAInstall`
2. Wrap your App with the `ReactPWAInstallProvider`.
3. Use the `supported` and `isInstalled` (desctructed from `useReactPWAInstall`) functions to determine whether to show your Install button (or banner,popup,etc...). Generally, the install button should only be shown if `supported` returns true and `isInstalled` returns false. (You should add the app specific criterias on top of this: amount of time spent on the site, certain engagement, etc.)
4. Call `pwaInstall` (desctructed from `useReactPWAInstall`) when the user clicked on the install button. See the list of options below. You might want to handle rejection (or possible rejection) here, and not prompt the user again for a certain period of time or until a new meaningful engagement.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import myLogo from "img/logo.png";

function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: "Install Web App",
      logo: myLogo,
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "This is a very good app that does a lot of useful stuff. ",
    })
      .then(() => alert("App installed successfully or instructions for install shown"))
      .catch(() => alert("User opted out from installing"));
  };

  return (
    <div>
      {supported() && !isInstalled() && (
        <button type="button" onClick={handleClick}>
          Install App
        </button>
      )}
    </div>
  );
}

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
    <App />
  </ReactPWAInstallProvider>,
  document.querySelector("#root")
);
```

## API

- `ReactPWAInstallProvider`: Context provider, required. For debug purposes, the `enableLogging` property can be used.
- `useReactPWAInstall`: React hook that provides `pwaInstall`, `supported`, `isInstalled`
- `supported`: Helper function to decide if the install button should be shown to the user. Returns true in 2 cases:
  - the beforeinstallprompt event is supported, and it has fired
  - manual installation is supported
- `isInstalled`: Helper function to decide if the install button should be shown to the user. Returns true if the user is currently visiting the site from the installed 'standalone' app.
- `pwaInstall`: Will open the installation dialog according to the user's platform. See below for options. This function returns a promise. The promise is rejected only if the user cancels the native installation process. The promise is fulfilled when the native installation was successful or when the manual installation steps were shown.

## Options for `pwaInstall`

The following options are available to customize the install dialog:

| Prop                     | type            | Default Value   | Description                                               |
| ------------------------ | --------------- | --------------- | --------------------------------------------------------- |
| `title (optional)`       | string          | Install Web App | The header of the dialog window                           |
| `logo (optional)`        | string          | -               | Path to an image representing the app, typically the icon |
| `features (optional)`    | React.ReactNode | -               | A list of features, see "Usage" for an example            |
| `description (optional)` | string          | -               | Description of the app                                    |

## Customization

To customize the colors and fonts of the dialog, you can wrap the ReactPWAInstallProvider with a Material-UI ThemeProvider.
See https://material-ui.com/customization/theming/ for more info.

[npm-badge]: https://img.shields.io/npm/v/react-pwa-install
[npm-downloads]: https://img.shields.io/npm/dt/react-pwa-install
[npm]: https://www.npmjs.com/package/react-pwa-install
[pwa]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[add to home screen]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
[beforeinstallpromptevent]: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
[this guide]: https://web.dev/promote-install/
[pwa is installable]: https://web.dev/install-criteria/
[source code]: https://github.com/zoltangy/react-pwa-install-demo
