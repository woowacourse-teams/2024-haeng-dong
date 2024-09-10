const isMobileDevice = () => {
  const userAgent = window.navigator.userAgent;
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some(mobile => userAgent.match(mobile));
};

export default isMobileDevice;
