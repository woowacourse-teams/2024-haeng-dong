import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

type InputValue = {
  value: string;
  index: number;
};

const useDynamicInput = (validateFunc: (name: string) => ValidateResult) => {
  const [inputList, setInputList] = useState<InputValue[]>([{value: '', index: 0}]);
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (inputRefList.current.length <= 0) return;

    const lastInput = inputRefList.current[inputRefList.current.length - 1];

    if (lastInput) {
      lastInput.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [inputList]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const {isValid: isValidInput, errorMessage: validationResultMessage} = validateFunc(value);

    // TODO: (@weadie) 가독성이 안좋다는 리뷰. 함수 분리필요
    if (isLastInputFilled(index, value)) {
      // 마지막 인풋이 한 자라도 채워진다면 새로운 인풋을 생성해 간편한 다음 입력을 유도합니다.

      setErrorMessage('');
      setInputList(prevInputs => {
        const updatedInputList = [...prevInputs];
        const targetInput = findInputByIndex(index, updatedInputList);

        targetInput.value = value;

        // 새로운 인덱스를 inputs 배열 길이를 기준으로 설정
        const newIndex = updatedInputList[updatedInputList.length - 1].index + 1;

        return [...updatedInputList, {index: newIndex, value: ''}];
      });
    } else if (isValidInput || value.length === 0) {
      // 인풋이 비어있다면 새로운 인풋을 생성하지 않습니다.

      setErrorMessage('');
      setInputList(prevInputs => {
        const updatedInputList = [...prevInputs];
        const targetInput = findInputByIndex(index, updatedInputList);

        targetInput.value = value;

        return updatedInputList;
      });
    } else {
      // 유효성 검사에 실패한 입력입니다. 이전 입력으로 복구하고 에러 메세지를 세팅합니다.

      // index에 해당하는 아이템을 찾습니다.
      const targetInput = findInputByIndex(index);

      // 오류가 난 값말고 기존의 값을 사용합니다.
      event.target.value = targetInput.value;

      setErrorMessage(validationResultMessage ?? '');
    }

    handleCanSubmit();
  };

  // 현재까지 입력된 값들로 submit을 할 수 있는지 여부를 핸들합니다.
  const handleCanSubmit = () => {
    setCanSubmit(inputList.length > 0 && getFilledInputList().length > 0);
  };

  const deleteEmptyInputElementOnBlur = () => {
    // 0, 1번 input이 값이 있는 상태에서 두 input의 값을 모두 x버튼으로 제거해도 input이 2개 남아있는 문제를 위해 조건문을 추가했습니다.
    if (getFilledInputList().length === 0 && inputList.length > 1) {
      setInputList([{index: 0, value: ''}]);
      return;
    }

    // *표시 조건문은 처음에 input을 클릭했다가 블러시켰을 때 filledInputList가 아예 없어 .index에 접근할 때 오류가 납니다. 이를 위한 얼리리턴을 두었습니다.
    if (getFilledInputList().length === 0) return;

    // *
    if (getFilledInputList().length !== inputList.length) {
      setInputList(inputList => {
        const filledInputList = getFilledInputList(inputList);

        // 새 입력의 인덱스를 inputs 길이를 기준으로 설정
        const newIndex = filledInputList[filledInputList.length - 1].index + 1;

        return [...filledInputList, {index: newIndex, value: ''}];
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

  // list 인자를 넘겨주면 그 인자로 찾고, 없다면 inputList state를 사용합니다.
  const getFilledInputList = (list?: InputValue[]) => {
    return (list ?? inputList).filter(({value}) => value !== '');
  };

  const isLastInputFilled = (index: number, value: string) => {
    const lastInputIndex = inputList[inputList.length - 1].index;

    return value !== '' && index === lastInputIndex;
  };

  return {
    inputList,
    inputRefList,
    handleInputChange,
    deleteEmptyInputElementOnBlur,
    errorMessage,
    getFilledInputList,
    focusNextInputOnEnter,
    canSubmit,
    // TODO: (@weadie) 네이밍 수정
  };
};

export default useDynamicInput;
