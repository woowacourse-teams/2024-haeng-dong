import {useState} from 'react';

import validatePurchase from '@utils/validate/validatePurchase';
import {Bill} from 'types/serviceType';

import useRequestPostBillList from './queries/useRequestPostBillList';
import {BillInputType, InputPair} from './useDynamicBillActionInput';

interface UseSetBillInputProps {
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UseSetBillInputReturns {
  billInput: Bill;
  handleChangeBillInput: (field: BillInputType, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlurBillRequest: () => void;
}

const useSetBillInput = ({setIsAddEditableItem}: UseSetBillInputProps): UseSetBillInputReturns => {
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
      setBillInput(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleBlurBillRequest = () => {
    const isEmptyTitle = billInput.title.trim().length;
    const isEmptyPrice = Number(billInput.price);

    // 두 input의 값이 모두 채워졌을 때 api 요청
    // api 요청을 하면 Input을 띄우지 않음
    if (isEmptyTitle && isEmptyPrice) {
      postBillList(
        {billList: [billInput]},
        {
          onSuccess: () => {
            setBillInput(initialInput);
            setIsAddEditableItem(false);
          },
        },
      );
    }
  };

  return {
    billInput,
    handleBlurBillRequest,
    handleChangeBillInput,
  };
};

export default useSetBillInput;
