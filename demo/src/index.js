import React from "react";
import { render } from "react-dom";

import ReactPWAInstallProvider, { useReactPWAInstall } from "../../src";

export default function Demo() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  console.log("Installable: ", supported());

  const handleClick = () => {
    pwaInstall({
      title: "Install Web App",
      logo: "src/logo.png",
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
      .then(() => {
        alert("App installed successfully or the install instruction was shown");
      })
      .catch(() => alert("App not installed, user opted out. "));
  };

  return (
    <div>
      {
        /*supported() && !isInstalled()*/ true && (
          <button type="button" onClick={handleClick}>
            Click me to install
          </button>
        )
      }
    </div>
  );
}

render(
  <ReactPWAInstallProvider>
    <Demo />
  </ReactPWAInstallProvider>,
  document.querySelector("#demo")
);
