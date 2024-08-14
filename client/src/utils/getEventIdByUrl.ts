import REGEXP from '@constants/regExp';

const extractEventIdFromUrl = (url: string) => {
  const regex = REGEXP.eventUrl;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getEventIdByUrl = () => {
  return extractEventIdFromUrl(window.location.pathname) || '';
};

export default getEventIdByUrl;
