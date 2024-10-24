import {useEffect, useState} from 'react';

type UseImageLazyLoadingProps<T extends HTMLElement> = {
  targetRef: React.RefObject<T>;
  src: string;
  fallbackSrc?: string;
  threshold?: number;
};

type ImgTagSrcType = string | undefined;

const useImageLazyLoading = <T extends HTMLElement>({
  targetRef,
  src,
  fallbackSrc,
  threshold = 0.05,
}: UseImageLazyLoadingProps<T>) => {
  const [imageSrc, setImageSrc] = useState<ImgTagSrcType>(undefined);
  const [fallbackImageSrc, setFallbackImageSrc] = useState<ImgTagSrcType>(undefined);

  useEffect(() => {
    if (targetRef && !imageSrc) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            setFallbackImageSrc(fallbackSrc);
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
  }, [targetRef, src, fallbackSrc]);

  return {
    imageSrc,
    fallbackImageSrc,
  };
};

export default useImageLazyLoading;
