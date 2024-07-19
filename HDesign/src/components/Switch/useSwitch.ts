import {useEffect, useState} from 'react';

interface UseSwitchProps {
  value: string;
  initialValue?: string;
  values: string[];
  onChange: (value: string) => void;
}

export const useSwitch = ({value, initialValue, values, onChange}: UseSwitchProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue ?? value);

  useEffect(() => {
    setSelectedValue(value);
    onChange(value);
  }, [value]);

  const handleClick = (index: number) => {
    setSelectedValue(values[index]);
    onChange(values[index]);
  };

  return {selectedValue, handleClick};
};
