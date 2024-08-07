import {BottomSheet, Text} from 'haengdong-design';

import {allMemberListModalStyle, allMemberListModalTitleStyle} from './SetAllMemberListModal.style';

interface SetAllMemberListModalProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetAllMemberListModal = ({
  openBottomSheet,
  setOpenBottomSheet,
  setIsClickAllMemberListButton,
}: SetAllMemberListModalProps) => {
  const handleCloseAllMemberListModal = () => {
    setIsClickAllMemberListButton(prev => !prev);
    setOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={openBottomSheet} onClose={handleCloseAllMemberListModal}>
      <div css={allMemberListModalStyle}>
        <div css={allMemberListModalTitleStyle}>
          <Text size="bodyBold">전체 참여자 수정하기</Text>
          {/* TODO: (@soha): 인원 텍스트 색 수정 필요 */}
          <Text size="bodyBold" color="sematic">
            총 N명
          </Text>
        </div>
      </div>
    </BottomSheet>
  );
};

export default SetAllMemberListModal;
