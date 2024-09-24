import {useRef, useState} from 'react';

import {BillDetail} from 'types/serviceType';
import {RequestPutBill} from '@apis/request/bill';

import useEditBillPageScroll from './useEditBillPageScroll';

interface Props {
  billDetails: BillDetail[];
  newBill: RequestPutBill;
  newBillDetails: BillDetail[];
}

const useEditBillKeyboardAction = ({newBill, billDetails, newBillDetails}: Props) => {
  const [keyboardTargetId, setKeyboardTargetId] = useState<null | number>(null);
  const billDetailsRef = useRef<HTMLDivElement>(null);
  const {handleScrollToFocus} = useEditBillPageScroll();

  const handleClickBillDetailInput = (id: number) => {
    setKeyboardTargetId(id);
    handleScrollToFocus({id, billDetailsRef});
  };

  const totalFixedPrice = newBillDetails.reduce(
    (sum, detail) => (detail.isFixed && detail.id !== keyboardTargetId ? sum + detail.price : sum),
    0,
  );
  const keyboardMaxPrice = keyboardTargetId === 0 ? 10000000 : Math.max(0, newBill.price - totalFixedPrice);
  const keyboardInitialValue =
    newBillDetails.find(({id}) => id === keyboardTargetId)?.price.toLocaleString('ko-kr') ??
    newBill.price.toLocaleString('ko-kr');

  return {
    handleClickBillDetailInput,
    billDetailsRef,
    keyboardMaxPrice,
    keyboardInitialValue,
    keyboardTargetId,
    setKeyboardTargetId,
  };
};

export default useEditBillKeyboardAction;