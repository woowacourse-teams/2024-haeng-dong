const getImageUrl = (name: string, format: 'png' | 'webp' | 'svg') => {
  return `${process.env.IMAGE_URL}/${name}.${format}`;
};

export default getImageUrl;
