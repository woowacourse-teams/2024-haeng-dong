import AmountInput from '@components/AmountInput/AmountInput';
import BillDetails from '@components/BillDetails/BillDetails';
import {Back, FixedButton, Flex, MainLayout, TopNav} from '@components/Design';
import Top from '@components/Design/components/Top/Top';
import REGEXP from '@constants/regExp';
import {css} from '@emotion/react';
import useRequestGetBillDetails from '@hooks/queries/bill/useRequestGetBillDetails';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

export interface BillSummary {
  title: string;
  price: string;
}

const EditBillPage = () => {
  const location = useLocation();
  const {bill} = location.state;
  const {billDetails} = useRequestGetBillDetails({billId: Number(bill.id)});
  const [billSummary, setBillSummary] = useState<BillSummary>({
    title: bill.title,
    price: Number(bill.price).toLocaleString('ko-kr'),
  });

  const onTitleInputChange = (value: string) => {
    if (REGEXP.billTitle.test(value)) {
      setBillSummary(prev => ({...prev, title: value}));
    }
  };

  const handleChangeBillTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 12) {
      onTitleInputChange(billSummary.title.slice(0, 12));
    } else {
      onTitleInputChange(event.target.value);
    }
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
            <Top.EditableLine value={billSummary.title} onChange={handleChangeBillTitle} />
            <Top.Line text="에서" />
          </Flex>
        </Top>
        <AmountInput value={billSummary.price} />
        <BillDetails billDetails={billDetails} />
      </div>
      <div
        css={css`
          position: fixed;
          width: 100%;
          max-width: 768px;
          bottom: 6.25rem;
        `}
      >
        {/* <NumberKeyboard type="amount" maxNumber={10000000} onChange={handleNumberKeyboardChange} /> */}
      </div>
      <FixedButton disabled={false} onClick={() => {}} onDeleteClick={() => {}}>
        수정완료
      </FixedButton>
    </MainLayout>
  );
};

export default EditBillPage;
