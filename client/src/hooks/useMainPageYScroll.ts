import {useEffect, useRef} from 'react';

const useMainPageYScroll = () => {
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const threshold = window.innerHeight * 2;
  const translateX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (featureSectionRef.current) {
        const scrollY = window.scrollY;

        if (scrollY >= threshold && scrollY < threshold + window.innerHeight * 5) {
          featureSectionRef.current.style.position = 'fixed';
          featureSectionRef.current.style.top = '0';
          if (scrollY < threshold + window.innerHeight * 4) {
            translateX.current = (scrollY - threshold) * (window.innerWidth / window.innerHeight);
          } else {
            featureSectionRef.current.style.opacity = `${(window.innerHeight * 7 - scrollY) / window.innerHeight}`;
          }
        } else {
          if (scrollY < threshold) {
            translateX.current = 0;
          } else {
            translateX.current = 4 * window.innerWidth;
          }
          featureSectionRef.current.style.opacity = '1';
          featureSectionRef.current.style.position = 'static';
          featureSectionRef.current.style.top = '';
        }
        const newTransform = `translateX(calc(200vw - ${translateX.current}px))`;
        featureSectionRef.current.style.transform = newTransform;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [featureSectionRef, window.innerHeight, window.innerWidth, window.scrollY]);

  return {featureSectionRef};
};

export default useMainPageYScroll;
