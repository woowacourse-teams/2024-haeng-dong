import {useEffect, useState} from 'react';

const usePageBackground = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.document.body.style.maxWidth = '100vw';
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.document.body.style.maxWidth = '768px';
    };
  }, [window.scrollY, window.innerHeight]);

  return {isVisible};
};

export default usePageBackground;
