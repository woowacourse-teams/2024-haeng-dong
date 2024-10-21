const getImageUrl = (name: string, format: 'png' | 'webp') => {
  return `${process.env.IMAGE_URL}/${name}.${format}`;
};

export default getImageUrl;
