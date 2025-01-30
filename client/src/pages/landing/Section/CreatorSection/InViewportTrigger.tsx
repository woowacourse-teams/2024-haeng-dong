import React, {useEffect, useRef} from 'react';

type InViewportTriggerProps = React.PropsWithChildren &
  React.ComponentProps<'section'> & {
    callback: () => void;
  };

const InViewportTrigger = ({callback, children, ...viewportProps}: InViewportTriggerProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callback();
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

  return (
    <section ref={sectionRef} {...viewportProps}>
      {children}
    </section>
  );
};

export default InViewportTrigger;
