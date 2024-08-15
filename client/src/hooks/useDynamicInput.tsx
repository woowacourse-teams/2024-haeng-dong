import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

type InputValue = {
  value: string;
  index: number;
};

export type ReturnUseDynamicInput = {
  inputList: InputValue[];
  inputRefList: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleInputChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteEmptyInputElementOnBlur: () => void;
  errorMessage: string;
  getFilledInputList: (list?: InputValue[]) => InputValue[];
  focusNextInputOnEnter: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  canSubmit: boolean;
  errorIndexList: number[];
  validateAndSetTargetInput: (index: number, value: string) => void;
};

const useDynamicInput = (validateFunc: (name: string) => ValidateResult): ReturnUseDynamicInput => {
  const [inputList, setInputList] = useState<InputValue[]>([{index: 0, value: ''}]);
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorIndexList, setErrorIndexList] = useState<number[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (inputRefList.current.length <= 0) return;

    const lastInput = inputRefList.current[inputRefList.current.length - 1];

    if (lastInput) {
      lastInput.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [inputList]);

  // event에서 value를 받아와서 새 인풋을 만들고 검증 후 set 하는 함수
  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    makeNewInputWhenFirstCharacterInput(index, value);
    validateAndSetTargetInput(index, value);
  };

  // 첫 번째 문자가 입력됐을 때 새로운 인풋이 생기는 기능 분리
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

  // onChange와 setValue 둘 다 지원하기 위해서 validate를 분리
  const validateAndSetTargetInput = (index: number, value: string) => {
    const {isValid: isValidInput, errorMessage: validationResultMessage} = validateFunc(value);

    if (isValidInput) {
      // 입력된 값이 유효하면 데이터(inputList)를 변경합니다.
      setErrorMessage('');

      if (errorIndexList.includes(index)) {
        setErrorIndexList(prev => prev.filter(i => i !== index));
      }

      changeInputListValue(index, value);
    } else if (value.length === 0) {
      // value의 값이 0이라면 errorMessage는 띄워지지 않지만 값은 변경됩니다. 또한 invalid한 값이기에 errorIndex에 추가합니다.

      setErrorMessage('');
      changeErrorIndex(index);

      changeInputListValue(index, value);
    } else {
      // 유효성 검사에 실패한 입력입니다. 에러 메세지를 세팅합니다.

      const targetInput = findInputByIndex(index);

      setErrorMessage(validationResultMessage ?? '');
      changeErrorIndex(targetInput.index);
    }
  };

  // inputList가 변했을 때 canSubmit이 반영되도록
  // setValue가 수행되기 전에 handleCanSubmit이 실행되어 새로운 입력값에 대한 검증이 되지 않는 버그를 해결
  useEffect(() => {
    handleCanSubmit();
  }, [inputList]);

  // 현재까지 입력된 값들로 submit을 할 수 있는지 여부를 핸들합니다.
  const handleCanSubmit = () => {
    setCanSubmit(inputList.length > 0 && getFilledInputList().length > 0 && errorIndexList.length === 0);
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

  const changeInputListValue = (index: number, value: string) => {
    setInputList(prevInputs => {
      const updatedInputList = [...prevInputs];
      const targetInput = findInputByIndex(index, updatedInputList);

      targetInput.value = value;

      return updatedInputList;
    });
  };

  const changeErrorIndex = (index: number) => {
    setErrorIndexList(prev => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
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
    return (list ?? inputList).filter(({value}) => value.trim().length !== 0);
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
    errorIndexList,
    validateAndSetTargetInput,
    // TODO: (@weadie) 네이밍 수정
  };
};

export default useDynamicInput;
