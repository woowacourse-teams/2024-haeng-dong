import CopyToClipboard from 'react-copy-to-clipboard';
import {useNavigate} from 'react-router-dom';

import toast from '@hooks/useToast/toast';
import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import useShareEvent from '@hooks/useShareEvent';

import {Button} from '@components/Design';

import {isMobileDevice} from '@utils/detectDevice';
import getDeletedLastPath from '@utils/getDeletedLastPath';

type ShareEventButtonProps = {
  eventPageOutletContext: EventPageContextProps;
};

const ShareEventButton = ({eventPageOutletContext}: ShareEventButtonProps) => {
  const {eventName, bankName, accountNumber, isAdmin} = eventPageOutletContext;
  const navigate = useNavigate();

  const isMobile = isMobileDevice();
  const {shareText, onShareButtonClick} = useShareEvent(eventName, isMobile);

  const isReady = bankName !== '' && accountNumber !== '';

  const induceBankInfoBeforeShare = () => {
    if (!isReady && isAdmin) {
      toast.error('잠깐! 정산을 초대하기 전에\n계좌를 등록해주세요', {
        showingTime: 3000,
        position: 'bottom',
      });

      const navigatePath = `${getDeletedLastPath(location.pathname)}/admin/edit`;
      navigate(navigatePath);
      return;
    }

    if (!isReady && !isAdmin) {
      toast.error('정산자가 계좌를 등록해야 초대 가능합니다.\n정산자에게 문의해주세요', {
        showingTime: 3000,
        position: 'bottom',
      });
      return;
    }

    onShareButtonClick();
  };

  return isMobile ? (
    <Button size="small" variants="tertiary" onClick={induceBankInfoBeforeShare} style={{marginRight: '1rem'}}>
      카카오톡으로 정산 초대하기
    </Button>
  ) : (
    <CopyToClipboard
      text={shareText}
      onCopy={() =>
        toast.confirm('링크가 복사되었어요 :) \n참여자들에게 링크를 공유해 주세요!', {
          showingTime: 3000,
          position: 'bottom',
        })
      }
    >
      <Button size="small" variants="tertiary" onClick={induceBankInfoBeforeShare} style={{marginRight: '1rem'}}>
        정산 초대하기
      </Button>
    </CopyToClipboard>
  );
};

export default ShareEventButton;
