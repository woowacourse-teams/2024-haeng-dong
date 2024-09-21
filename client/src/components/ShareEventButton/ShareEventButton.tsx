import CopyToClipboard from 'react-copy-to-clipboard';

import toast from '@hooks/useToast/toast';

import useShareEvent from '@hooks/useShareEvent';

import {Button} from '@components/Design';

import isMobileDevice from '@utils/isMobileDevice';

const ShareEventButton = () => {
  const isMobile = isMobileDevice();
  const {shareText, onShareButtonClick} = useShareEvent(isMobile);

  return isMobile ? (
    <Button size="small" variants="secondary" onClick={onShareButtonClick}>
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
      <Button size="small" variants="secondary" onClick={onShareButtonClick}>
        정산 초대하기
      </Button>
    </CopyToClipboard>
  );
};

export default ShareEventButton;
