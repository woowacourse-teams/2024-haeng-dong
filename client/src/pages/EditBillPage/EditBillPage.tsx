import {RequestPutBill} from '@apis/request/bill';
import AmountInput from '@components/AmountInput/AmountInput';
import BillDetails from '@components/BillDetails/BillDetails';
import {Back, FixedButton, Flex, MainLayout, TopNav} from '@components/Design';
import NumberKeyboardBottomSheet from '@components/Design/components/NumberKeyboard/NumberKeyboardBottomSheet';
import Top from '@components/Design/components/Top/Top';
import REGEXP from '@constants/regExp';
import {css} from '@emotion/react';
import useRequestDeleteBill from '@hooks/queries/bill/useRequestDeleteBill';
import useRequestGetBillDetails from '@hooks/queries/bill/useRequestGetBillDetails';
import useRequestPutBill from '@hooks/queries/bill/useRequestPutBill';
import useRequestPutBillDetails from '@hooks/queries/bill/useRequestPutBillDetails';
import getEventIdByUrl from '@utils/getEventIdByUrl';
import {useEffect, useState, useRef, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Bill, BillDetail} from 'types/serviceType';

const EditBillPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const bill: Bill = location.state.bill;
  const {billDetails} = useRequestGetBillDetails({billId: Number(bill.id)});

  useEffect(() => {
    if (billDetails) setNewBillDetails(billDetails);
  }, [billDetails]);

  const [newBill, setNewBill] = useState<RequestPutBill>({
    title: bill.title,
    price: bill.price,
  });
  const [newBillDetails, setNewBillDetails] = useState<BillDetail[]>([]);

  const [keyboardTargetId, setKeyboardTargetId] = useState<null | number>(null);

  const {putBillAsync, isSuccess: isSuccessPutBill, isPending: isPendingPutBill} = useRequestPutBill();
  const {deleteBill, isSuccess: isSuccessDeleteBill} = useRequestDeleteBill();
  const {
    putBillDetails,
    isSuccess: isSusseccPutBillDetails,
    isPending: isPendingPutBillDetails,
  } = useRequestPutBillDetails({billId: bill.id});

  const billDetailsRef = useRef<HTMLDivElement>(null);

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

  const handleChangeBillDetails = (value: string) => {
    if (value === newBillDetails.find(({id}) => id === keyboardTargetId)?.price.toLocaleString('ko-kr')) return;

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

  const handleScrollToFocus = useCallback((id: number) => {
    setTimeout(() => {
      if (billDetailsRef.current) {
        const selectedItem = billDetailsRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        if (selectedItem) {
          const screenHeight = window.screen.height;
          const keyboardHeight = 416;
          const itemTop = selectedItem.offsetTop;
          const itemHeight = selectedItem.offsetHeight;
          const itemBottom = itemTop + itemHeight;
          const visibleY = screenHeight - keyboardHeight;

          const targetScrollTop = itemBottom < visibleY ? 0 : itemTop - (visibleY - itemHeight) / 2;

          window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        }
      }
    }, 100);
  }, []);

  const handleClickInput = (id: number) => {
    setKeyboardTargetId(id);
    handleScrollToFocus(id);
  };

  const isBillChanged = bill.title !== newBill.title || bill.price !== newBill.price;
  const isBillDetailsChanged = JSON.stringify(billDetails) !== JSON.stringify(newBillDetails);
  const canSubmit = isBillChanged || isBillDetailsChanged;

  const handleClickDelete = () => {
    deleteBill({billId: bill.id});
  };

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
      navigate(`/events/${eventId}/admin`);
    }
  }, [isSuccessDeleteBill, isSusseccPutBillDetails, isSuccessPutBill, isBillDetailsChanged]);

  const isPendingUpdate = () => {
    if (!isBillChanged) {
      return isPendingPutBill;
    }

    return isPendingPutBill || isPendingPutBillDetails;
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Flex justifyContent="spaceBetween">
            <Top.EditableLine value={newBill.title} onChange={handleChangeBillTitle} />
            <Top.Line text="에서" />
          </Flex>
        </Top>
        <AmountInput
          value={newBill.price.toLocaleString('ko-kr')}
          onClick={() => handleClickInput(0)}
          underlined={true}
          activated={keyboardTargetId === 0}
        />

        <BillDetails
          ref={billDetailsRef}
          billDetails={newBillDetails}
          onClickInput={handleClickInput}
          activatedId={keyboardTargetId as number}
        />
      </div>
      {keyboardTargetId !== null && (
        <div
          css={css`
            height: 416px;
          `}
          content=" "
        />
      )}
      <FixedButton
        disabled={!canSubmit}
        onClick={handleClickUpdate}
        onDeleteClick={handleClickDelete}
        variants={isPendingUpdate() ? 'loading' : 'primary'}
      >
        수정완료
      </FixedButton>
      <NumberKeyboardBottomSheet
        type="amount"
        maxNumber={keyboardTargetId === 0 ? 100000000 : newBill.price}
        initialValue={
          newBillDetails.find(({id}) => id === keyboardTargetId)?.price.toLocaleString('ko-kr') ??
          newBill.price.toLocaleString('ko-kr')
        }
        onChange={keyboardTargetId === 0 ? handleChangeBillPrice : handleChangeBillDetails}
        isOpened={keyboardTargetId !== null}
        onClose={() => setKeyboardTargetId(null)}
      />
    </MainLayout>
  );
};

export default EditBillPage;
