import {useEffect, useState} from 'react';
import {KeyboardType} from './NumberKeyboard';

interface Props {
  type: KeyboardType;
  maxNumber: number;
  onChange: (value: string) => void;
}

const useNumberKeyboard = ({type, maxNumber, onChange}: Props) => {
  const [value, setValue] = useState('');

  const onClickKeypad = (inputValue: string) => {
    const newNumber = Number((value + inputValue).replace(/,/g, ''));

    if (newNumber > maxNumber) {
      setValue(type === 'amount' ? maxNumber.toLocaleString() : `${maxNumber}`);
    } else {
      const newValue =
        type === 'amount' ? Number((value + inputValue).replace(/,/g, '')).toLocaleString() : value + inputValue;
      setValue(newValue);
    }
  };

  const onClickDelete = () => {
    const newValue =
      type === 'amount'
        ? Number(value.slice(0, value.length - 1).replace(/,/g, '')).toLocaleString()
        : value.slice(0, value.length - 1);
    setValue(newValue === '0' ? '' : newValue);
  };

  const onClickDeleteAll = () => {
    setValue('');
  };

  const onClickAddAmount = (amount: number) => {
    const newNumber = Number(value.replace(/,/g, '')) + amount;
    if (newNumber > maxNumber) {
      setValue(type === 'amount' ? maxNumber.toLocaleString() : `${maxNumber}`);
    } else {
      const newValue = newNumber.toLocaleString();
      setValue(newValue);
    }
  };

  useEffect(() => {
    onChange(value);
  }, [value, setValue]);

  return {value, onClickKeypad, onClickDelete, onClickDeleteAll, onClickAddAmount};
};

export default useNumberKeyboard;
