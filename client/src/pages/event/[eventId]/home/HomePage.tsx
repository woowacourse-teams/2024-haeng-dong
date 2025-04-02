import {useMatch, useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import Reports from '@components/Reports/Reports';
import useRequestGetImages from '@hooks/queries/images/useRequestGetImages';
import {IconPictureSquare} from '@components/Design/components/Icons/Icons/IconPictureSquare';
import {Banner} from '@components/Design/components/Banner';

import useEventDataContext from '@hooks/useEventDataContext';
import useAmplitude from '@hooks/useAmplitude';
import useBanner from '@hooks/useBanner';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Tab, Tabs, Title} from '@HDesign/index';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import {receiptStyle} from './HomePage.style';

const HomePage = () => {
  const {trackCheckStepList} = useAmplitude();
  const {isAdmin, eventName, steps, bankName, accountNumber} = useEventDataContext();
  const isInHomePage = useMatch(ROUTER_URLS.home) !== null;

  const {totalExpenseAmount} = useTotalExpenseAmountStore();
  const {images} = useRequestGetImages();
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const {isShowAccountBanner, onDeleteAccount} = useBanner({
    eventId,
    bankName,
    accountNumber,
    steps,
  });

  return (
    <div css={receiptStyle}>
      <Title
        title={eventName}
        amount={totalExpenseAmount}
        icon={
          images.length !== 0 && (
            <button>
              <IconPictureSquare onClick={() => navigate(`/event/${eventId}/images`)} />
            </button>
          )
        }
      />
      {isShowAccountBanner && (
        <Banner
          onDelete={onDeleteAccount}
          title="주최자가 계좌번호를 등록하지 않았어요"
          description="계좌번호 복사는 불가능해요. 금액만 복사 할 수 있어요."
        />
      )}
      <Tabs>
        <Tab label="참여자 별 정산" content={<Reports />} />
        <Tab
          label="전체 지출 내역"
          content={<StepList data={steps ?? []} isAdmin={isAdmin && !isInHomePage} />}
          onClick={trackCheckStepList}
        />
      </Tabs>
    </div>
  );
};

export default HomePage;
