const getEventBaseUrl = (url: string) => {
  const urlParts = url.split('/');
  const baseUrl = urlParts[1] + '/' + urlParts[2];

  return baseUrl;
};

export default getEventBaseUrl;
