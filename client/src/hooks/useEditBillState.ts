import {useEffect, useState} from 'react';

import {RequestPutBill} from '@apis/request/bill';
import {Bill, BillDetail} from 'types/serviceType';

import REGEXP from '@constants/regExp';

interface Props {
  bill: Bill;
  billDetails: BillDetail[];
}

interface HandleChangeBillDetailsProps {
  value: string;
  keyboardTargetId: number;
}

const useEditBillState = ({bill, billDetails}: Props) => {
  const [newBill, setNewBill] = useState<RequestPutBill>({
    title: bill.title,
    price: bill.price,
  });
  const [newBillDetails, setNewBillDetails] = useState<BillDetail[]>(billDetails);

  useEffect(() => {
    if (billDetails) setNewBillDetails(billDetails);
  }, [billDetails]);

  const onTitleInputChange = (value: string) => {
    if (REGEXP.billTitle.test(value)) {
      setNewBill(prev => ({...prev, title: value}));
    }
  };

  const handleChangeBillTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 12) {
      onTitleInputChange(newBill.title.slice(0, 12));
    } else {
      onTitleInputChange(event.target.value);
    }
  };

  const handleChangeBillPrice = (value: string) => {
    if (value === newBill.price.toLocaleString('ko-kr')) return;

    const newPrice = Number(value.replace(/,/g, ''));
    setNewBill(prev => ({...prev, price: newPrice}));

    const detailCount = newBillDetails.length;
    const basePrice = Math.floor(newPrice / detailCount);
    const remainder = newPrice % detailCount;

    setNewBillDetails(prev =>
      prev.map((detail, index) => ({
        ...detail,
        price: index === detailCount - 1 ? basePrice + remainder : basePrice,
        isFixed: false,
      })),
    );
  };

  const handleChangeBillDetails = ({value, keyboardTargetId}: HandleChangeBillDetailsProps) => {
    if (Number(value.replace(/,/g, '')) === newBillDetails.find(({id}) => id === keyboardTargetId)?.price) return;
    setNewBillDetails(prev => {
      const updatedDetails = prev.map(detail =>
        detail.id === keyboardTargetId ? {...detail, price: Number(value.replace(/,/g, '')), isFixed: true} : detail,
      );

      const totalFixedPrice = updatedDetails.reduce((sum, detail) => (detail.isFixed ? sum + detail.price : sum), 0);

      const remainingPrice = newBill.price - totalFixedPrice;
      const unfixedCount = updatedDetails.filter(detail => !detail.isFixed).length;

      const unfixedPrice = Math.floor(remainingPrice / unfixedCount);
      const lastUnfixedIndex = updatedDetails.map(detail => !detail.isFixed).lastIndexOf(true);

      return updatedDetails.map((detail, index) => {
        if (detail.isFixed) return detail;
        if (index === lastUnfixedIndex) {
          return {...detail, price: remainingPrice - unfixedPrice * (unfixedCount - 1)};
        }
        return {...detail, price: unfixedPrice};
      });
    });
  };

  return {newBill, newBillDetails, handleChangeBillPrice, handleChangeBillTitle, handleChangeBillDetails};
};

export default useEditBillState;
