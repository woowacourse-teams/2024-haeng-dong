import type {Bill} from 'types/serviceType';

import {useState} from 'react';

import {ValidateResult} from '@utils/validate/type';
import {requestDeleteBillAction, requestPutBillAction} from '@apis/request/bill';

import {BillInputType, InputPair} from '@hooks/useDynamicBillActionInput';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import ERROR_MESSAGE from '@constants/errorMessage';

import {useStepList} from './useStepList/useStepList';
import {useFetch} from './useFetch/useFetch';

const usePutAndDeleteBillAction = (
  initialValue: InputPair,
  validateFunc: (inputPair: Bill) => ValidateResult,
  onClose: () => void,
) => {
  const eventId = getEventIdByUrl();
  const {refreshStepList} = useStepList();
  const {fetch} = useFetch();

  const [inputPair, setInputPair] = useState<InputPair>(initialValue);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errorInfo, setErrorInfo] = useState<Record<string, boolean>>({title: false, price: false});
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleInputChange = (field: BillInputType, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;

    // 현재 타겟의 event.target.value를 넣어주기 위해서
    const getFieldValue = (): Bill => {
      if (field === 'title') {
        return {title: value, price: Number(inputPair.price)};
      } else {
        return {title: inputPair.title, price: Number(value)};
      }
    };

    const {isValid, errorMessage, errorInfo} = validateFunc(getFieldValue());

    if (isValid) {
      // valid일 경우 에러메시지 nope, setValue, submit은 value가 비지 않았을 때 true를 설정
      setErrorMessage(undefined);
      setInputPair(prevInputPair => {
        return {
          ...prevInputPair,
          [field]: value,
        };
      });
      setCanSubmit(value.length !== 0);
    } else {
      // valid하지 않으면 event.target.value 덮어쓰기
      event.target.value = inputPair[field];
      setErrorMessage(errorMessage);
      setCanSubmit(false);
    }

    if (field === 'title') {
      // 현재 field가 title일 때는 title의 errorInfo만 반영해줌 (blur에서도 errorInfo를 조작하기 때문)
      setErrorInfo(prev => ({title: errorInfo?.title ?? false, price: prev.price}));
    } else {
      setErrorInfo(prev => ({title: prev.title, price: errorInfo?.price ?? false}));
    }
  };

  const handleOnBlur = () => {
    const {isValid, errorMessage, errorInfo} = validateFunc({title: inputPair.title, price: Number(inputPair.price)});

    // blur시 값이 비었을 때 error state 반영
    if (inputPair.price.length === 0 || inputPair.title.length === 0) {
      setErrorMessage(ERROR_MESSAGE.preventEmpty);
      setErrorInfo({title: inputPair.title.length === 0, price: inputPair.price.length === 0});
      setCanSubmit(false);
      return;
    }

    // 이외 blur시에 추가로 검증함
    setErrorMessage(errorMessage);
    setCanSubmit(isValid);
    setErrorInfo(errorInfo ?? {title: false, price: false});
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, inputPair: InputPair, actionId: number) => {
    event.preventDefault();

    const {title, price} = inputPair;

    await fetch({
      queryFunction: () => requestPutBillAction({eventId, actionId, title, price: Number(price)}),
      onSuccess: () => {
        refreshStepList();
        onClose();
      },
    });
  };

  const onDelete = async (actionId: number) => {
    await fetch({
      queryFunction: () => requestDeleteBillAction({eventId, actionId}),
      onSuccess: () => {
        refreshStepList();
        onClose();
      },
    });
  };

  return {
    inputPair,
    handleInputChange,
    handleOnBlur,
    onSubmit,
    onDelete,
    canSubmit,
    errorMessage,
    errorInfo,
  };
};

export default usePutAndDeleteBillAction;
