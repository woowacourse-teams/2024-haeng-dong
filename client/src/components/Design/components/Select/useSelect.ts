import {useRef, useState} from 'react';

type UseSelectProps<T> = {
  defaultValue?: T;
  onSelect: (option: T) => void;
};

const useSelect = <T extends string | number | readonly string[]>({defaultValue, onSelect}: UseSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const selectRef = useRef<HTMLUListElement>(null);

  const handleSelect = (option: T) => {
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
