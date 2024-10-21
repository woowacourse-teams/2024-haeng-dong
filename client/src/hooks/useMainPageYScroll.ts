import {useEffect, useRef} from 'react';

const useMainPageYScroll = () => {
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const translateX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (featureSectionRef.current) {
        const featureSectionTop = featureSectionRef.current.offsetTop;
        const scrollY = window.scrollY;

        if (scrollY >= featureSectionTop && translateX.current <= window.innerWidth * 4) {
          window.scrollTo(0, featureSectionTop);
          translateX.current += scrollY - featureSectionTop;
          const newTransform = `translateX(calc(200vw - ${translateX.current > 0 ? translateX.current : 0}px))`;
          featureSectionRef.current.style.transform = newTransform;
        }
        if (scrollY <= featureSectionTop && translateX.current >= 0) {
          window.scrollTo(0, featureSectionTop);
          translateX.current += scrollY - featureSectionTop;
          const newTransform = `translateX(calc(200vw - ${translateX.current < window.innerWidth * 4 ? translateX.current : window.innerWidth * 4}px))`;
          featureSectionRef.current.style.transform = newTransform;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {featureSectionRef};
};

export default useMainPageYScroll;
