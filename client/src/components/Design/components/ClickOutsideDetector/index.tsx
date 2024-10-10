import {useEffect} from 'react';

type ClickOutsideDetectorProps<T extends HTMLElement> = React.PropsWithChildren & {
  targetRef: React.RefObject<T>;
  onClickOutside: () => void;
};

const ClickOutsideDetector = <T extends HTMLElement>({
  targetRef,
  onClickOutside,
  children,
}: ClickOutsideDetectorProps<T>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;

      if (targetRef.current && !targetRef.current.contains(targetNode)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [targetRef]);

  return children;
};

export default ClickOutsideDetector;
