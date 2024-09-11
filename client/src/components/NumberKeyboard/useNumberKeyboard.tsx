import {useEffect, useState} from 'react';

import {KeyboardType} from './NumberKeyboard';

interface Props {
  type: KeyboardType;
  maxNumber?: number;
  onChange: (value: string) => void;
}

const useNumberKeyboard = ({type, maxNumber, onChange}: Props) => {
  const [value, setValue] = useState('');

  const onClickKeypad = (inputValue: string) => {
    const newValue = (value + inputValue).replace(/,/g, '');
    setValueByType(newValue);
  };

  const onClickDelete = () => {
    const newValue = value.slice(0, value.length - 1).replace(/,/g, '');
    setValueByType(newValue);
  };

  const onClickDeleteAll = () => {
    setValue('');
  };

  const onClickAddAmount = (amount: number) => {
    const newValue = `${Number(value.replace(/,/g, '')) + amount}`;
    setValueByType(newValue);
  };

  const setValueByType = (value: string) => {
    if (type === 'string') {
      setValue(value);
    } else {
      const limitedValue = maxNumber && Number(value) > maxNumber ? `${maxNumber}` : value;
      if (Number(limitedValue) === 0) {
        setValue('');
      } else {
        setValue(type === 'amount' ? Number(limitedValue).toLocaleString() : `${limitedValue}`);
      }
    }
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return {value, onClickKeypad, onClickDelete, onClickDeleteAll, onClickAddAmount};
};

export default useNumberKeyboard;
