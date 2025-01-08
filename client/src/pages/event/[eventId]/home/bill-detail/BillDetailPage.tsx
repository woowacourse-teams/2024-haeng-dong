import {css} from '@emotion/react';
import {useLocation, useNavigate} from 'react-router-dom';

import AmountInput from '@components/AmountInput/AmountInput';
import BillDetails from '@components/BillDetails/BillDetails';
import Top from '@components/Design/components/Top/Top';
import {Bill} from 'types/serviceType';
import useRequestGetBillDetails from '@hooks/queries/bill/useRequestGetBillDetails';

import useEditBillState from '@hooks/useEditBillState';

import {FixedButton, Flex, MainLayout, TopNav} from '@components/Design';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const BillDetailPage = () => {
  const location = useLocation();
  const eventId = getEventIdByUrl();
  const bill: Bill = location.state.bill;
  const {members: billDetails} = useRequestGetBillDetails({billId: bill.id});

  const {newBill, newBillDetails} = useEditBillState({bill, billDetails});

  const navigate = useNavigate();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
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
            <Top.Line text={newBill.title} emphasize={[newBill.title]} />
            <Top.Line text="에서" />
          </Flex>
        </Top>
        <AmountInput value={newBill.price.toLocaleString('ko-kr')} underlined={false} activated={false} />

        <BillDetails billDetails={newBillDetails} />
      </div>
      <FixedButton onClick={() => navigate(`/event/${eventId}/home`)}>닫기</FixedButton>
    </MainLayout>
  );
};

export default BillDetailPage;
