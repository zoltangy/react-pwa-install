export const platforms = {
  NATIVE: "native", // currently: Chrome, Edge mobile, Samsung internet
  FIREFOX: "firefox",
  OPERA: "opera",
  IDEVICE: "idevice",
  OTHER: "other", // don't know, so will do nothing
};

export function getPlatform() {
  var platform;
  var ua = window.navigator.userAgent;

  if (window.hasOwnProperty("BeforeInstallPromptEvent")) {
    platform = platforms.NATIVE;
  } else if (/Firefox/i.test(ua) && /android/i.test(ua)) {
    platform = platforms.FIREFOX;
  } else if (/opr/i.test(ua) && /android/i.test(ua)) {
    platform = platforms.OPERA;
  } else if (
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  ) {
    platform = platforms.IDEVICE;
  } else {
    platform = platforms.OTHER;
  }
  console.log(platform);
  return platform;
}
