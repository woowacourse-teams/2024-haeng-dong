import {useState} from 'react';

import validatePurchase from '@utils/validate/validatePurchase';
import {Bill} from 'types/serviceType';

import useRequestPostBillList from './queries/useRequestPostBillList';
import {BillInputType, InputPair} from './useDynamicBillActionInput';

interface UseSetBillInputReturns {
  handleChangeBillInput: (field: BillInputType, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlurBillRequest: () => void;
}

const useSetBillInput = (): UseSetBillInputReturns => {
  const initialInput = {title: '', price: 0};
  const [billInput, setBillInput] = useState<Bill>(initialInput);

  const {mutate: postBillList} = useRequestPostBillList();

  const handleChangeBillInput = (field: BillInputType, event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const {isValid} = validatePurchase({
      ...billInput,
      [field]: value,
    });

    if (isValid) {
      console.log(billInput);
      setBillInput(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleBlurBillRequest = () => {
    // 두 input의 값이 모두 채워졌을 때 api 요청
    // api 요청을 하면 더이상 Input이 아니게 됨

    const isEmptyTitle = billInput.title.trim().length;
    const isEmptyPrice = Number(billInput.price);

    if (isEmptyTitle && isEmptyPrice) {
      console.log('조건 충족!');
      postBillList({billList: [billInput]}),
        {
          onSuccess: () => {
            console.log('post 요청 완료');
          },
        };
    }

    // 하나라도 공백이 존재하면 api 요청 X
    // 여전히 input임
  };

  return {
    handleBlurBillRequest,
    handleChangeBillInput,
  };
};

export default useSetBillInput;
