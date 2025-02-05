import {useMatch, useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import Reports from '@components/Reports/Reports';
import useRequestGetImages from '@hooks/queries/images/useRequestGetImages';
import {IconPictureSquare} from '@components/Design/components/Icons/Icons/IconPictureSquare';

import useEventDataContext from '@hooks/useEventDataContext';
import useAmplitude from '@hooks/useAmplitude';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Tab, Tabs, Title} from '@HDesign/index';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import {receiptStyle} from './HomePage.style';

const HomePage = () => {
  const {trackCheckStepList} = useAmplitude();
  const {isAdmin, eventName, steps} = useEventDataContext();
  const isInHomePage = useMatch(ROUTER_URLS.home) !== null;

  const {totalExpenseAmount} = useTotalExpenseAmountStore();
  const {images} = useRequestGetImages();
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

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
