import CopyToClipboard from 'react-copy-to-clipboard';

import {useToast} from '@hooks/useToast/useToast';

import useShareEvent from '@hooks/useShareEvent';

import {Button} from '@components/Design';

import isMobileDevice from '@utils/isMobileDevice';

const ShareEventButton = () => {
  const {showToast} = useToast();

  const isMobile = isMobileDevice();
  const {shareText, onShareButtonClick} = useShareEvent(isMobile);

  return isMobile ? (
    <Button size="small" variants="tertiary" onClick={onShareButtonClick}>
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
      <Button size="small" variants="tertiary" onClick={onShareButtonClick}>
        정산 초대하기
      </Button>
    </CopyToClipboard>
  );
};

export default ShareEventButton;
