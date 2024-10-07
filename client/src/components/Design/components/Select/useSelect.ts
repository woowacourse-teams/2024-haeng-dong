import {useRef, useState} from 'react';

type UseSelectProps = {
  defaultValue?: string;
  onSelect: (option: string) => void;
};

const useSelect = ({defaultValue, onSelect}: UseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const selectRef = useRef<HTMLUListElement>(null);

  const handleSelect = (option: string) => {
    setValue(option);
    onSelect(option);
    setIsOpen(false);
  };

  return {
    selectRef,
    isOpen,
    value,
    handleSelect,
    setIsOpen,
  };
};

export default useSelect;
