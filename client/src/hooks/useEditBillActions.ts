import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import {Bill, BillDetail} from 'types/serviceType';
import {RequestPutBill} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestPutBill from './queries/bill/useRequestPutBill';
import useRequestDeleteBill from './queries/bill/useRequestDeleteBill';
import useRequestPutBillDetails from './queries/bill/useRequestPutBillDetails';

interface Props {
  bill: Bill;
  billDetails: BillDetail[];
  newBill: RequestPutBill;
  newBillDetails: BillDetail[];
}

const useEditBillActions = ({bill, billDetails, newBill, newBillDetails}: Props) => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const {putBillAsync, isSuccess: isSuccessPutBill, isPending: isPendingPutBill} = useRequestPutBill();
  const {deleteBill, isSuccess: isSuccessDeleteBill} = useRequestDeleteBill();
  const {
    putBillDetails,
    isSuccess: isSusseccPutBillDetails,
    isPending: isPendingPutBillDetails,
  } = useRequestPutBillDetails({billId: bill.id});

  const handleClickDelete = () => {
    deleteBill({billId: bill.id});
  };

  const isBillChanged = bill.title !== newBill.title || bill.price !== newBill.price;
  const isBillDetailsChanged = JSON.stringify(billDetails) !== JSON.stringify(newBillDetails);
  const canSubmit = newBill.price !== 0 && (isBillChanged || isBillDetailsChanged);

  const handleClickUpdate = async () => {
    if (isBillChanged) {
      await putBillAsync({billId: bill.id, price: newBill.price, title: newBill.title});
    }
    if (isBillDetailsChanged) {
      putBillDetails({
        billId: bill.id,
        billDetails: newBillDetails.map(({id, price, isFixed}) => ({
          id,
          price,
          isFixed,
        })),
      });
    }
  };

  useEffect(() => {
    if (isSuccessDeleteBill || isSusseccPutBillDetails || (isSuccessPutBill && !isBillDetailsChanged)) {
      navigate(`/event/${eventId}/admin`);
    }
  }, [isSuccessDeleteBill, isSusseccPutBillDetails, isSuccessPutBill, isBillDetailsChanged]);

  const isPendingUpdate = () => {
    if (!isBillChanged) {
      return isPendingPutBill;
    }

    return isPendingPutBill || isPendingPutBillDetails;
  };

  return {
    handleClickDelete,
    handleClickUpdate,
    isPendingUpdate,
    canSubmit,
  };
};

export default useEditBillActions;
