const generateUniqueId = (): string => {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000000).toString();
  return timestamp + randomNum;
};

export default generateUniqueId;
