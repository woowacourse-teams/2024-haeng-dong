import {useRef, useState} from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const baseRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  return {
    isOpen,
    setIsOpen,
    baseRef,
    dropdownRef,
  };
};

export default useDropdown;
