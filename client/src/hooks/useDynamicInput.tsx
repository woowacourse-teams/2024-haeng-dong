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

  // 현재까지 입력된 값들로 submit을 할 수 있는지 여부를 핸들합니다.
  const handleCanSubmit = () => {
    if (inputList.length > 0 && getFilledInputList().length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const deleteEmptyInputElementOnBlur = () => {
    // 0, 1번 input이 값이 있는 상태에서 두 input의 값을 모두 x버튼으로 제거해도 input이 2개 남아있는 문제를 위해 조건문을 추가했습니다.
    if (getFilledInputList().length === 0 && inputList.length > 1) {
      setInputList([{index: 0, value: ''}]);
      return;
    }

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

  const focusNextInputOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      inputRefList.current[index + 1]?.focus();
    }
  };
  // 아래부터는 이 훅에서 재사용되는 함수입니다.

  // list 인자를 넘겨주면 그 인자로 찾고, 없다면 inputList state를 사용합니다.
  const findInputByIndex = (index: number, list?: InputValue[]) => {
    return (list ?? inputList).filter(input => input.index === index)[0];
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
