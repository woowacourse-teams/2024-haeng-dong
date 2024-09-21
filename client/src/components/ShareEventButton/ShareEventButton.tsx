import CopyToClipboard from 'react-copy-to-clipboard';
import {useNavigate} from 'react-router-dom';

import {useToast} from '@hooks/useToast/useToast';
import {Event} from 'types/serviceType';

import useShareEvent from '@hooks/useShareEvent';

import {Button} from '@components/Design';

import isMobileDevice from '@utils/isMobileDevice';

type ShareEventButtonProps = {
  eventOutline: Event;
};

const ShareEventButton = ({eventOutline}: ShareEventButtonProps) => {
  const {eventName, bankName, accountNumber} = eventOutline;
  const navigate = useNavigate();

  const {showToast} = useToast();

  const isMobile = isMobileDevice();
  const {shareText, onShareButtonClick} = useShareEvent(eventName, isMobile);

  const induceBankInfoBeforeShare = () => {
    if (bankName === '' || accountNumber === '') {
      showToast({
        showingTime: 3000,
        message: '잠깐! 정산을 초대하기 전에\n계좌를 등록해주세요.',
        type: 'error',
        position: 'bottom',
        bottom: '8rem',
      });
      navigate(`${location.pathname}/edit`);
      return;
    }

    onShareButtonClick();
  };

  return isMobile ? (
    <Button size="small" variants="secondary" onClick={induceBankInfoBeforeShare}>
      카카오톡으로 정산 초대하기
    </Button>
  ) : (
    <CopyToClipboard
      text={shareText}
      onCopy={() =>
        showToast({
          showingTime: 3000,
          message: '링크가 복사되었어요 :) \n참여자들에게 링크를 공유해 주세요!',
          type: 'confirm',
          position: 'bottom',
          bottom: '8rem',
        })
      }
    >
      <Button size="small" variants="secondary" onClick={induceBankInfoBeforeShare}>
        정산 초대하기
      </Button>
    </CopyToClipboard>
  );
};

export default ShareEventButton;
