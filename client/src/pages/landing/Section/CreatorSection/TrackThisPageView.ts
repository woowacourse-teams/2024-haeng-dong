import {useEffect} from 'react';

import useAmplitude from '@hooks/useAmplitude';

type TrackThisPageViewProps = React.PropsWithChildren & {
  sectionRef: React.RefObject<HTMLElement>;
};

const TrackThisPageView = ({sectionRef, children}: TrackThisPageViewProps) => {
  const {trackLandingPageBottomView} = useAmplitude();

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            trackLandingPageBottomView();
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        },
        {threshold: 0.3},
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }

    return;
  }, [sectionRef]);

  return children;
};

export default TrackThisPageView;
