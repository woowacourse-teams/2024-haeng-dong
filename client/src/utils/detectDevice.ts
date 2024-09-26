export const isMobileDevice = () => {
  const userAgent = window.navigator.userAgent;
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some(mobile => userAgent.match(mobile));
};

export const isIOS = () => {
  const userAgent = window.navigator.userAgent;
  const iosRegex = [/iPhone/i, /iPad/i, /iPod/i];

  return iosRegex.some(device => userAgent.match(device));
};

export const isAndroid = () => {
  const userAgent = window.navigator.userAgent;
  const androidRegex = [/Android/i, /BlackBerry/i, /Windows Phone/i];

  return androidRegex.some(device => userAgent.match(device));
};
