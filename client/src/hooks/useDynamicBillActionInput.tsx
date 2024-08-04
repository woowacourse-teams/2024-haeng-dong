import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {Bill} from 'types/serviceType';

type InputPair = Omit<Bill, 'price'> & {
  price: string;
  index: number;
};

type BillInputType = 'title' | 'price';

// TODO: (@weadie) 지나치게 도메인에 묶여있는 인풋. 절대 다른 페어인풋으로 재사용할 수 없다.
const useDynamicBillActionInput = (validateFunc: (inputPair: Bill) => ValidateResult) => {
  const [inputPairList, setInputPairList] = useState<InputPair[]>([{title: '', price: '', index: 0}]);
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (inputRefList.current.length > 0) {
      const lastInputPair = inputRefList.current.slice(-2);
      lastInputPair.forEach(ref => ref?.scrollIntoView({behavior: 'smooth', block: 'center'}));
    }
  }, [inputPairList]);

  const handleInputChange = (index: number, field: BillInputType, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const targetInputPair = findInputPairByIndex(index);
    const {isValid: isValidInput, errorMessage: validationResultMessage} = validateFunc({
      ...targetInputPair,
      price: 0, // price가 input에서 0을 초기값으로 갖지않도록 타입을 수정했기 때문에 0을 명시적으로 넘겨줍니다.
      [field]: value,
    });

    const {title, price} = targetInputPair;

    // TODO: (@weadie) 가독성이 안좋다는 리뷰. 함수로 분리
    if (isLastInputPairFilled({index, field, value})) {
      setErrorMessage('');
      setInputPairList(prevInputPairList => {
        const updatedInputPairList = [...prevInputPairList];
        const targetInputPair = findInputPairByIndex(index, updatedInputPairList);

        targetInputPair[field] = value;

        // 새로운 인덱스를 inputs 배열 길이를 기준으로 설정
        const newIndex = updatedInputPairList[updatedInputPairList.length - 1].index + 1;
        const finalInputs = [...updatedInputPairList, {index: newIndex, title: '', price: ''}];

        return finalInputs;
      });
    } else if (isValidInput || value.length === 0) {
      setErrorMessage('');
      setInputPairList(prevInputPairList => {
        const updatedInputPairList = [...prevInputPairList];
        const targetInputPair = findInputPairByIndex(index, updatedInputPairList);

        targetInputPair[field] = value;

        return updatedInputPairList;
      });
    } else {
      const targetInput = findInputPairByIndex(index);

      event.target.value = targetInput[field];

      setErrorMessage(validationResultMessage ?? '');
    }

    handleCanSubmit();
  };

  const deleteEmptyInputPairElementOnBlur = () => {
    // 이름, 금액 2개중 최소 하나 이상 값을 가지고 있는 inputPair 배열
    const filledMinInputPairList = inputPairList.filter(({title, price}) => title !== '' || price !== '');

    // 0쌍, 1쌍 input이 값이 있는 상태에서 두 쌍의 값을 모두 x버튼으로 제거해도 입력 쌍이 2개 남아있는 문제를 위해 조건문을 추가했습니다.
    if (filledMinInputPairList.length === 0 && inputPairList.length > 1) {
      setInputPairList([{index: 0, title: '', price: ''}]);
      return;
    }

    if (filledMinInputPairList.length === 0) return;

    if (filledMinInputPairList.length !== inputPairList.length) {
      // 이름, 금액 2개중 하나라도 값이 있다면 지우지 않습니다.
      setInputPairList(prevInputPairList => {
        const filledInputPairList = prevInputPairList.filter(({title, price}) => title !== '' || price !== '');

        const newIndex = filledInputPairList[filledInputPairList.length - 1].index + 1;
        return [...filledInputPairList, {index: newIndex, title: '', price: ''}];
      });
    }
  };

  const handleCanSubmit = () => {
    setCanSubmit(inputPairList.length > 0 && getFilledInputPairList().length > 0);
  };

  const focusNextInputOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, index: number, field: BillInputType) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      // 2개(제목, 가격)를 쌍으로 index를 관리하고 있으므로 input element 정확히 특정하기 위한 개별 input element key 값을 계산합니다.
      const exactInputIndex = index * 2 + (field === 'title' ? 0 : 1);

      inputRefList.current[exactInputIndex + 1]?.focus();
    }
  };

  // 아래부터는 이 훅에서 재사용되는 함수입니다.

  // list 인자를 넘겨주면 그 인자로 찾고, 없다면 InputPairList state를 사용합니다.
  const findInputPairByIndex = (index: number, list?: InputPair[]) => {
    return (list ?? inputPairList).filter(input => input.index === index)[0];
  };

  // list 인자를 넘겨주면 그 인자로 찾고, 없다면 InputPairList state를 사용합니다.
  const getFilledInputPairList = (list?: InputPair[]) => {
    return (list ?? inputPairList).filter(({title, price}) => title !== '' && price !== '');
  };

  const isLastInputPairFilled = ({index, value}: {index: number; field: BillInputType; value: string}) => {
    const lastInputIndex = inputPairList[inputPairList.length - 1].index;

    return value !== '' && index === lastInputIndex;
  };

  return {
    inputPairList,
    getFilledInputPairList,
    inputRefList,
    handleInputChange,
    deleteEmptyInputPairElementOnBlur,
    errorMessage,
    canSubmit,
    focusNextInputOnEnter,
  };
};

export default useDynamicBillActionInput;
