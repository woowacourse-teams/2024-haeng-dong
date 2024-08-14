const extractEventIdFromUrl = (url: string) => {
  const regex = /\/event\/([a-zA-Z0-9-]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getEventIdByUrl = () => {
  return extractEventIdFromUrl(window.location.pathname) || '';
};

export default getEventIdByUrl;
