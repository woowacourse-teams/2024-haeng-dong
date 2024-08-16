import {useEffect, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

import {ERROR_MESSAGE} from '@constants/errorMessage';

export type InputValue = {
  value: string;
  index?: number;
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

  useEffect(() => {
    changeCanSubmit();
  }, [errorMessage, errorIndexList]);

  const handleChange = (index: number = 0, value: string) => {
    const {isValid, errorMessage: validationResultMessage} = validateFunc(value);

    if (validationResultMessage === ERROR_MESSAGE.preventEmpty) {
      setErrorMessage(validationResultMessage);
      updateInputList(index, value);
      addErrorIndex(index);
    } else if (isValid && value.length !== 0) {
      // TODO: (@soha) 쿠키가 작업한 errorMessage를 위로 올리기 변경 추후에 merge후에 반영하기
      setErrorMessage('');
      updateInputList(index, value);
      removeErrorIndex(index);
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

  const changeCanSubmit = () => {
    setCanSubmit(errorIndexList.length || errorMessage.length ? false : true);
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
