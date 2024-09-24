const getDeletedLastPath = (url: string) => {
  const urlParts = url.split('/');
  urlParts.pop();
  return urlParts.join('/');
};

export default getDeletedLastPath;
