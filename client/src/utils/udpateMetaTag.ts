export const updateMetaTag = (name: string, content: string) => {
  let metaTag = document.querySelector(`meta[property="${name}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', name);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};
