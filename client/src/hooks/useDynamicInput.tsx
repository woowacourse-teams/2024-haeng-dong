import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

type InputValue = {
  value: string;
  index: number;
};

const useDynamicInput = (validateFunc: (name: string) => ValidateResult) => {
  const [inputs, setInputs] = useState<InputValue[]>([{value: '', index: 0}]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  // const [errorIds, setErrorIds] = useState<string>('');

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const {isValid, errorMessage} = validateFunc(value);

    if (isLastInputFilled(index, value)) {
      setInputs(prevInputs => {
        const updatedInputs = [...prevInputs];
        const targetInput = updatedInputs.filter(input => input.index === index);

        targetInput[0].value = value;

        // 새로운 인덱스를 inputs 배열 길이를 기준으로 설정
        const newIndex = updatedInputs[updatedInputs.length - 1].index + 1;
        const finalInputs = [...updatedInputs, {index: newIndex, value: ''}];

        return finalInputs;
      });
    } else {
      setInputs(prevInputs => {
        const updatedInputs = [...prevInputs];
        const targetInput = updatedInputs.filter(input => input.index === index);

        targetInput[0].value = value;

        return updatedInputs;
      });
    }
  };

  const getFilledStringList = (stringList: string[]) => {
    return stringList.filter(string => string.trim() !== '');
  };

  const getFilledInputList = () => {
    return getFilledStringList(inputs.map(({value}) => value));
  };

  const isLastInputFilled = (index: number, value: string) => {
    const lastInputIndex = inputs[inputs.length - 1].index;

    return value !== '' && index === lastInputIndex;
  };

  const handleInputBlur = (index: number) => {
    if (getFilledInputList().length !== inputs.length) {
      setInputs(prevInputs => {
        const filledInputList = prevInputs.filter(({value}) => value !== '');

        // 새 입력의 인덱스를 inputs 길이를 기준으로 설정
        const newIndex = filledInputList[filledInputList.length - 1].index + 1;

        const finalInputs = [...filledInputList, {index: newIndex, value: ''}];

        return finalInputs;
      });
    }
  };

  useEffect(() => {
    if (inputRefs.current.length <= 0) return;

    const lastInput = inputRefs.current[inputRefs.current.length - 1];

    if (lastInput) {
      lastInput.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [inputs]);

  return {
    inputs,
    inputRefs,
    handleInputChange,
    handleInputBlur,
    errorMessage,
    getFilledInputList,
    canSubmit, // TODO: (@weadie) 이거 리모트에서 보고 가져오기
    // TODO: (@weadie) 네이밍 수정
    getNonEmptyInputs: getFilledInputList,
  };
};

export default useDynamicInput;
