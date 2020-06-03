import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { platforms, getPlatform } from "./Platforms";
import InstallDialog from "./InstallDialog";

const ReactPWAInstallContext = createContext(Promise.reject);

export const useReactPWAInstall = () => useContext(ReactPWAInstallContext);

const platform = getPlatform();

export const ReactPWAInstallProvider = ({ children, enableLogging }) => {
  const awaitingPromiseRef = useRef();
  const deferredprompt = useRef(null);
  const [dialogState, setDialogState] = useState(null);
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

  function logger(message) {
    if (enableLogging) {
      console.log(message);
    }
  }

  function isInstalled() {
    if (window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches) {
      logger("isInstalled: true. Already in standalone mode");
      return true;
    }
    logger("isInstalled: false.");
    return false;
  }

  function supported() {
    if (deferredprompt.current != null && platform === platforms.NATIVE) {
      logger("supported: true - native platform");
      return true;
    }
    if (platform !== platforms.NATIVE && platform !== platforms.OTHER) {
      logger("supported: true - manual support");
      return true;
    }
    logger("supported: false");
    return false;
  }

  function handleBeforeInstallPromptEvent(event) {
    event.preventDefault();
    deferredprompt.current = event;
    logger("beforeinstallprompt event fired and captured");
    setContextValue({
      supported: supported,
      isInstalled: isInstalled,
      pwaInstall: openDialog,
    });
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
    logger("handleInstall called");
    setDialogState(null);
    if (deferredprompt.current != null) {
      return deferredprompt.current
        .prompt()
        .then((event) => deferredprompt.current.userChoice)
        .then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            logger("PWA native installation succesful");
            if (awaitingPromiseRef.current) {
              awaitingPromiseRef.current.resolve();
            }
          } else {
            logger("User opted out by cancelling native installation");
            if (awaitingPromiseRef.current) {
              awaitingPromiseRef.current.reject();
            }
          }
        })
        .catch((err) => {
          if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
          }
          logger("Error occurred in the installing process: ", err);
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
        platform={platform}
        {...dialogState}
      />
    </>
  );
};

export default ReactPWAInstallProvider;
