import toast from '@hooks/useToast/toast';

import {Dropdown, DropdownButton} from '@components/Design';

type MobileShareEventButtonProps = {
  copyShare: () => Promise<void>;
  kakaoShare: () => void;
};

const MobileShareEventButton = ({copyShare, kakaoShare}: MobileShareEventButtonProps) => {
  const copyAndToast = async () => {
    await copyShare();
    toast.confirm('링크가 복사되었어요 :) \n참여자들에게 링크를 공유해 주세요!', {
      showingTime: 3000,
      position: 'bottom',
    });
  };

  return (
    <div style={{marginRight: '1rem'}}>
      <Dropdown base="button" baseButtonText="정산 초대하기">
        <DropdownButton text="링크 복사하기" onClick={copyAndToast} />
        <DropdownButton text="카카오톡으로 초대하기" onClick={kakaoShare} />
      </Dropdown>
    </div>
  );
};

export default MobileShareEventButton;
