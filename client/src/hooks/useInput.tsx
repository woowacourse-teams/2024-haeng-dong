import {useEffect, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

export type InputValue = {
  value: string;
  index: number;
};

export type UseInputReturn<T = InputValue> = {
  inputList: T[];
  errorMessage: string;
  errorIndexList: number[];
  canSubmit: boolean;
  handleChange: (index: number, value: string) => void;
  setInputList: React.Dispatch<React.SetStateAction<T[]>>;
  addErrorIndex: (index: number) => void;
  setCanSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

type UseInputProps<T = InputValue> = {
  validateFunc: (value: string) => ValidateResult;
  initialInputList: T[];
};

const useInput = <T extends InputValue>({validateFunc, initialInputList}: UseInputProps<T>): UseInputReturn<T> => {
  const [inputList, setInputList] = useState<T[]>(initialInputList);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorIndexList, setErrorIndexList] = useState<number[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (index: number, value: string) => {
    const {isValid, errorMessage: validationResultMessage} = validateFunc(value);

    if (isValid && value.length !== 0) {
      setErrorMessage('');
      updateInputList(index, value);
      removeErrorIndex(index);
      setCanSubmit(true);
    } else if (value.length === 0) {
      // TODO: (@soha) constants로 분리
      setErrorMessage('공백은 입력할 수 없어요.');
      updateInputList(index, value);
      addErrorIndex(index);
    } else {
      setErrorMessage(validationResultMessage ?? '올바르지 않은 입력이에요.');
      addErrorIndex(index);
    }
  };

  const updateInputList = (index: number, value: string) => {
    setInputList(prev => {
      const newList = [...prev];
      const targetInput = newList.find(input => input.index === index);
      if (targetInput) {
        targetInput.value = value;
      }
      return newList;
    });
  };

  const removeErrorIndex = (index: number) => {
    setErrorIndexList(prev => prev.filter(i => i !== index));
  };

  const addErrorIndex = (index: number) => {
    setErrorIndexList(prev => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  };

  return {
    inputList,
    errorMessage,
    errorIndexList,
    canSubmit,
    handleChange,
    setInputList,
    addErrorIndex,
    setCanSubmit,
  };
};

export default useInput;
