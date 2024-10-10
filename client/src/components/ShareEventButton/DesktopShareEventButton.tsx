import CopyToClipboard from 'react-copy-to-clipboard';

import toast from '@hooks/useToast/toast';

import {Button} from '@components/Design';

type DesktopShareEventButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  shareText: string;
  text: string;
};

const DesktopShareEventButton = ({shareText, text, onClick}: DesktopShareEventButtonProps) => {
  return (
    <CopyToClipboard
      text={shareText}
      onCopy={() =>
        toast.confirm('링크가 복사되었어요 :) \n참여자들에게 링크를 공유해 주세요!', {
          showingTime: 3000,
          position: 'bottom',
        })
      }
    >
      <Button size="small" variants="tertiary" onClick={onClick} style={{marginRight: '1rem'}}>
        {text}
      </Button>
    </CopyToClipboard>
  );
};

export default DesktopShareEventButton;
