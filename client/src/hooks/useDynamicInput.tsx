import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

import useInput from './useInput';

type InputValue = {
  value: string;
  index: number;
};

export type ReturnUseDynamicInput = {
  inputList: InputValue[];
  inputRefList: React.MutableRefObject<(HTMLInputElement | null)[]>;
  errorMessage: string | null;
  canSubmit: boolean;
  errorIndexList: number[];
  handleChange: (index: number, value: string) => void;
  handleInputChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteEmptyInputElementOnBlur: () => void;
  getFilledInputList: (list?: InputValue[]) => InputValue[];
  focusNextInputOnEnter: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  setInputValueTargetIndex: (index: number, value: string) => void;
};

const useDynamicInput = (validateFunc: (name: string) => ValidateResult): ReturnUseDynamicInput => {
  const initialInputList = [{index: 0, value: ''}];
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);

  const {inputList, errorMessage, errorIndexList, canSubmit, handleChange, setInputList} = useInput({
    validateFunc,
    initialInputList,
  });

  useEffect(() => {
    if (inputRefList.current.length <= 0) return;

    const lastInput = inputRefList.current[inputRefList.current.length - 1];

    if (lastInput) {
      lastInput.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [inputList]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    console.log(value);
    makeNewInputWhenFirstCharacterInput(index, value);
    handleChange(index, value);
  };

  const makeNewInputWhenFirstCharacterInput = (index: number, value: string) => {
    if (isLastInputFilled(index, value) && value.trim().length !== 0) {
      // 마지막 인풋이 한 자라도 채워진다면 새로운 인풋을 생성해 간편한 다음 입력을 유도합니다.
      setInputList(prevInputs => {
        const updatedInputList = [...prevInputs];

        // 새로운 인덱스를 inputs 배열 길이를 기준으로 설정
        const newIndex = updatedInputList[updatedInputList.length - 1].index + 1;

        return [...updatedInputList, {index: newIndex, value: ''}];
      });
    }
  };

  const deleteEmptyInputElementOnBlur = () => {
    // 0, 1번 input이 값이 있는 상태에서 두 input의 값을 모두 x버튼으로 제거해도 input이 2개 남아있는 문제를 위해 조건문을 추가했습니다.
    if (getFilledInputList().length === 0 && inputList.length > 1) {
      setInputList([{index: 0, value: ''}]);
      return;
    }

    // *표시 조건문은 처음에 input을 클릭했다가 블러시켰을 때 filledInputList가 아예 없어 .index에 접근할 때 오류가 납니다. 이를 위한 얼리리턴을 두었습니다.
    if (getFilledInputList().length === 0) return;

    if (getFilledInputList().length !== inputList.length) {
      setInputList(inputList => {
        const filledInputList = getFilledInputList(inputList);

        // 새 입력의 인덱스를 inputs 길이를 기준으로 설정
        const newIndex = filledInputList[filledInputList.length - 1].index + 1;

        return [...filledInputList, {index: newIndex, value: ''}];
      });
    }
  };

  const setInputValueTargetIndex = (index: number, value: string) => {
    setInputList(prevInputs => {
      const updatedInputList = [...prevInputs];
      const targetInput = findInputByIndex(index, updatedInputList);

      targetInput.value = value;

      return updatedInputList;
    });
  };

  const focusNextInputOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      inputRefList.current[index + 1]?.focus();
    }
  };

  const findInputByIndex = (index: number, list?: InputValue[]) => {
    return (list ?? inputList).filter(input => input.index === index)[0];
  };

  const getFilledInputList = (list?: InputValue[]) => {
    return (list ?? inputList).filter(({value}) => value.trim().length !== 0);
  };

  const isLastInputFilled = (index: number, value: string) => {
    const lastInputIndex = inputList[inputList.length - 1].index;

    return value !== '' && index === lastInputIndex;
  };

  return {
    inputList,
    inputRefList,
    errorMessage,
    canSubmit,
    errorIndexList,
    handleInputChange,
    handleChange,
    deleteEmptyInputElementOnBlur,
    getFilledInputList,
    focusNextInputOnEnter,
    setInputValueTargetIndex,
  };
};

export default useDynamicInput;
