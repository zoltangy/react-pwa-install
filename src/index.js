import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { platforms, getPlatform } from "./Platforms";
import InstallDialog from "./InstallDialog";

const ReactPWAInstallContext = createContext(Promise.reject);

export const useReactPWAInstall = () => useContext(ReactPWAInstallContext);

export default function ReactPWAInstallProvider({ children }) {
  const awaitingPromiseRef = useRef();
  const platform = useRef(getPlatform());
  const [dialogState, setDialogState] = useState(null);
  const [deferredprompt, setDeferredprompt] = useState(null);
  const [contextValue, setContextValue] = useState({
    supported: supported,
    isInstalled: isInstalled,
    pwaInstall: openDialog,
  });

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPromptEvent);
    return function cleanup() {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPromptEvent);
    };
  }, []);

  function isInstalled() {
    if (window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches) {
      console.log("Already in standalone mode");
      return true;
    }
    return false;
  }

  function supported() {
    if (deferredprompt != null && platform.current === platforms.NATIVE) {
      console.log("native platform");
      return true;
    }
    if (platform.current !== platforms.NATIVE && platform.current !== platforms.OTHER) {
      console.log("supported, but needs to be done manually");
      return true;
    }
    console.log("not supported");
    return false;
  }

  function handleBeforeInstallPromptEvent(event) {
    setDeferredprompt(event);
    event.preventDefault();
    console.log("beforeinstallprompt event");
  }

  function openDialog(options) {
    setDialogState(options);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  }

  function handleClose() {
    setDialogState(null);
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }
  }

  function handleInstall() {
    console.log("handleInstall");
    setDialogState(null);
    if (deferredprompt != null) {
      return deferredprompt
        .prompt()
        .then((event) => deferredprompt.userChoice)
        .then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("PWA installed succesfully");
            if (awaitingPromiseRef.current) {
              awaitingPromiseRef.current.resolve();
            }
          } else {
            console.log("User opted out by cancelling install");
            if (awaitingPromiseRef.current) {
              awaitingPromiseRef.current.reject();
            }
          }
        })
        .catch((err) => {
          if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
          }
          console.log("Error occurred in the installing process: ", err);
        });
    } else {
      if (awaitingPromiseRef.current) {
        awaitingPromiseRef.current.resolve();
      }
    }
  }

  return (
    <>
      <ReactPWAInstallContext.Provider value={contextValue} children={children} />

      <InstallDialog
        open={Boolean(dialogState)}
        onSubmit={handleInstall}
        onClose={handleClose}
        platform={platform.current}
        {...dialogState}
      />
    </>
  );
}
