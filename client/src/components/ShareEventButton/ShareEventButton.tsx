import CopyToClipboard from 'react-copy-to-clipboard';
import {useNavigate} from 'react-router-dom';

import toast from '@hooks/useToast/toast';
import {Event} from 'types/serviceType';

import useShareEvent from '@hooks/useShareEvent';

import {Button} from '@components/Design';

import isMobileDevice from '@utils/isMobileDevice';
import getDeletedLastPath from '@utils/getDeletedLastPath';

type ShareEventButtonProps = {
  eventOutline: Event;
};

const ShareEventButton = ({eventOutline}: ShareEventButtonProps) => {
  const {eventName, bankName, accountNumber} = eventOutline;
  const navigate = useNavigate();

  const isMobile = isMobileDevice();
  const {shareText, onShareButtonClick} = useShareEvent(eventName, isMobile);

  const induceBankInfoBeforeShare = () => {
    if (bankName === '' || accountNumber === '') {
      toast.confirm('잠깐! 정산을 초대하기 전에\n계좌를 등록해주세요', {
        showingTime: 3000,
        position: 'bottom',
      });

      const navigatePath = `${getDeletedLastPath(location.pathname)}/admin/edit`;

      navigate(navigatePath);
      return;
    }

    onShareButtonClick();
  };

  return isMobile ? (
    <Button size="small" variants="tertiary" onClick={induceBankInfoBeforeShare}>
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
      <Button size="small" variants="tertiary" onClick={induceBankInfoBeforeShare}>
        정산 초대하기
      </Button>
    </CopyToClipboard>
  );
};

export default ShareEventButton;
