import {useEffect, useState} from 'react';

type UseImageLazyLoadingProps<T extends HTMLElement> = {
  targetRef: React.RefObject<T>;
  src: string;
  threshold?: number;
};

const useImageLazyLoading = <T extends HTMLElement>({targetRef, src, threshold = 0.1}: UseImageLazyLoadingProps<T>) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (targetRef && !imageSrc) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            if (targetRef.current) {
              observer.unobserve(targetRef.current);
            }
          }
        },
        {threshold},
      );

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }

    return;
  }, [targetRef, src]);

  return {
    imageSrc,
  };
};

export default useImageLazyLoading;
