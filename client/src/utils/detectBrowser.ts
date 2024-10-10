// https://gurtn.tistory.com/214
const detectBrowser = () => {
  const browsers = [
    'Chrome',
    'Opera',
    'WebTV',
    'Whale',
    'Beonex',
    'Chimera',
    'NetPositive',
    'Phoenix',
    'Firefox',
    'Safari',
    'SkipStone',
    'Netscape',
    'Mozilla',
  ];

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('edg')) {
    return 'Edge';
  }

  if (userAgent.includes('trident') || userAgent.includes('msie')) {
    return 'Internet Explorer';
  }

  return browsers.find(browser => userAgent.includes(browser.toLowerCase())) || 'Other';
};

export default detectBrowser;
