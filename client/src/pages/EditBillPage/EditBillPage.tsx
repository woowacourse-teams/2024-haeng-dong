import {PutBillDetail, RequestPutBill} from '@apis/request/bill';
import AmountInput from '@components/AmountInput/AmountInput';
import BillDetails from '@components/BillDetails/BillDetails';
import {Back, BottomSheet, FixedButton, Flex, MainLayout, TopNav} from '@components/Design';
import NumberKeyboard from '@components/Design/components/NumberKeyboard/NumberKeyboard';
import NumberKeyboardBottomSheet from '@components/Design/components/NumberKeyboard/NumberKeyboardBottomSheet';
import Top from '@components/Design/components/Top/Top';
import REGEXP from '@constants/regExp';
import {css} from '@emotion/react';
import useRequestGetBillDetails from '@hooks/queries/bill/useRequestGetBillDetails';
import useRequestPutBill from '@hooks/queries/bill/useRequestPutBill';
import useRequestPutBillDetails from '@hooks/queries/bill/useRequestPutBillDetails';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {BillDetail} from 'types/serviceType';

interface BillDetailWithFixed extends BillDetail {
  isFixed: false;
}

const EditBillPage = () => {
  const location = useLocation();
  const {bill} = location.state;
  const {billDetails} = useRequestGetBillDetails({billId: Number(bill.id)});
  useEffect(() => {
    if (billDetails) setNewBillDetails(billDetails);
  }, [billDetails]);

  const [newBill, setNewBill] = useState<RequestPutBill>({
    title: bill.title,
    price: bill.price,
  });
  const [newBillDetails, setNewBillDetails] = useState<BillDetail[]>([]);

  const resetDetailsPrice = () => {
    const totalPrice = newBill.price;
    const detailCount = newBillDetails.length;
    const basePrice = Math.floor(totalPrice / detailCount);
    const remainder = totalPrice % detailCount;

    setNewBillDetails(prev =>
      prev.map((detail, index) => ({
        ...detail,
        price: index === detailCount - 1 ? basePrice + remainder : basePrice,
        isFixed: false,
      })),
    );
  };

  const [keyboardTargetId, setKeyboardTargetId] = useState<null | number>(null);

  const {putBill} = useRequestPutBill();
  const {putBillDetails} = useRequestPutBillDetails({billId: bill.id});

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
          onClick={() => setKeyboardTargetId(0)}
          underlined={true}
          activated={keyboardTargetId === 0}
        />
        <BillDetails
          billDetails={newBillDetails}
          onClickInput={setKeyboardTargetId}
          activatedId={keyboardTargetId as number}
        />
      </div>
      <div
        css={css`
          position: fixed;
          width: 100%;
          max-width: 768px;
          bottom: 6.25rem;
        `}
      ></div>
      <FixedButton disabled={false} onClick={() => {}} onDeleteClick={() => {}}>
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
