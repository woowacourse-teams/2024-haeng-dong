const getReplacedLastPath = (url: string, newLastPath: string) => {
  const urlParts = url.split('/');
  urlParts[urlParts.length - 1] = newLastPath;
  return urlParts.join('/');
};

export default getReplacedLastPath;
