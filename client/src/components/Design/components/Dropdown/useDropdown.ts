import {useEffect, useRef, useState} from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const meetBallsRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  const openDropdown = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const clickOutSide = (event: MouseEvent) => {
      const targetNode = event.target as Node;

      if (
        (dropdownRef.current && dropdownRef.current.contains(targetNode)) ||
        (meetBallsRef.current && meetBallsRef.current.contains(targetNode))
      ) {
        return;
      }

      setIsOpen(false);
    };
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  }, [dropdownRef]);

  return {
    isOpen,
    openDropdown,
    meetBallsRef,
    dropdownRef,
  };
};

export default useDropdown;
