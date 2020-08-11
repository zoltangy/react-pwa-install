import { isMobile, isAndroid, isFirefox, isIOS, isOpera, browserVersion } from "mobile-device-detect";

export const platforms = {
  NATIVE: "native", // currently: Chrome, Edge mobile, Samsung internet
  FIREFOX: "firefox",
  FIREFOX_NEW: "firefox_new", // above version 79
  OPERA: "opera",
  IDEVICE: "idevice",
  OTHER: "other", // don't know, so will do nothing
};

export function getPlatform() {
  let platform = platforms.OTHER;
  if (window.hasOwnProperty("BeforeInstallPromptEvent")) {
    platform = platforms.NATIVE;
  } else if (isMobile && isAndroid && isFirefox && +browserVersion >= 79) {
    platform = platforms.FIREFOX_NEW;
  } else if (isMobile && isAndroid && isFirefox) {
    platform = platforms.FIREFOX;
  } else if (isOpera && isAndroid && isMobile) {
    platform = platforms.OPERA;
  } else if (isIOS && isMobile) {
    platform = platforms.IDEVICE;
  }

  return platform;
}
