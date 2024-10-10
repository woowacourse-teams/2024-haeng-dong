import toast from '@hooks/useToast/toast';

import {Button} from '@components/Design';

type DesktopShareEventButtonProps = React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> & {
  onCopy: () => Promise<void>;
};

const DesktopShareEventButton = ({onCopy, children, ...buttonProps}: DesktopShareEventButtonProps) => {
  const copyAndToast = async () => {
    await onCopy();
    toast.confirm('링크가 복사되었어요 :) \n참여자들에게 링크를 공유해 주세요!', {
      showingTime: 3000,
      position: 'bottom',
    });
  };

  return (
    <Button size="small" variants="tertiary" onClick={copyAndToast} style={{marginRight: '1rem'}} {...buttonProps}>
      {children}
    </Button>
  );
};

export default DesktopShareEventButton;
