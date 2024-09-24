import {useLocation} from 'react-router-dom';

import {Bill} from 'types/serviceType';

import useRequestGetBillDetails from './queries/bill/useRequestGetBillDetails';
import useEditBillActions from './useEditBillActions';
import useEditBillKeyboardAction from './useEditBillKeyboardAction';
import useEditBillState from './useEditBillState';

const useEditBillPage = () => {
  const location = useLocation();

  const bill: Bill = location.state.bill;
  const {members: billDetails} = useRequestGetBillDetails({billId: bill.id});

  console.log(billDetails);

  const {newBill, newBillDetails, handleChangeBillPrice, handleChangeBillTitle, handleChangeBillDetails} =
    useEditBillState({bill, billDetails});
  const {handleClickDelete, handleClickUpdate, isPendingUpdate, canSubmit} = useEditBillActions({
    bill,
    billDetails,
    newBill,
    newBillDetails,
  });

  const {
    keyboardTargetId,
    setKeyboardTargetId,
    keyboardMaxPrice,
    keyboardInitialValue,
    billDetailsRef,
    handleClickBillDetailInput,
  } = useEditBillKeyboardAction({newBill, newBillDetails, billDetails});

  return {
    newBill,
    newBillDetails,
    billDetailsRef,
    handleChangeBillTitle,
    handleChangeBillPrice,
    handleChangeBillDetails,
    handleClickBillDetailInput,
    handleClickDelete,
    handleClickUpdate,
    isPendingUpdate,
    canSubmit,
    keyboardInitialValue,
    keyboardMaxPrice,
    keyboardTargetId,
    setKeyboardTargetId,
  };
};

export default useEditBillPage;
