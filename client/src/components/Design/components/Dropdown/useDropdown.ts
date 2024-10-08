import {useRef, useState} from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const meetBallsRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  return {
    isOpen,
    setIsOpen,
    meetBallsRef,
    dropdownRef,
  };
};

export default useDropdown;
