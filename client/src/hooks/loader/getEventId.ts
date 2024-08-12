const extractIdFromUrl = (url: string) => {
  const regex = /\/event\/([a-zA-Z0-9-]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getEventId = () => {
  const eventId = extractIdFromUrl(window.location.pathname) ?? '';

  return eventId;
};

export default getEventId;
