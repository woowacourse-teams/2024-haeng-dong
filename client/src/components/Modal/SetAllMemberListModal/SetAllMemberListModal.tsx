import {BottomSheet, Text, LabelGroupInput, IconButton, Icon, FixedButton} from 'haengdong-design';

import {
  allMemberListModalInputAndDeleteButtonContainer,
  allMemberListModalLabelGroupInputStyle,
  allMemberListModalStyle,
  allMemberListModalTitleStyle,
} from './SetAllMemberListModal.style';

interface SetAllMemberListModalProps {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputAndDeleteButton = () => {
  return (
    <div css={allMemberListModalInputAndDeleteButtonContainer}>
      <div css={{flexGrow: 1}}>
        <LabelGroupInput.Element elementKey="e" />
      </div>
      <IconButton variants="tertiary" size="medium">
        <Icon iconType="trash" iconColor="onTertiary" />
      </IconButton>
    </div>
  );
};

const SetAllMemberListModal = ({
  isOpenBottomSheet,
  setIsOpenBottomSheet,
  setIsOpenAllMemberListButton,
}: SetAllMemberListModalProps) => {
  const handleCloseAllMemberListModal = () => {
    setIsOpenAllMemberListButton(prev => !prev);
    setIsOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={handleCloseAllMemberListModal}>
      <div css={allMemberListModalStyle}>
        <div css={allMemberListModalTitleStyle}>
          <Text size="bodyBold">전체 참여자 수정하기</Text>
          {/* TODO: (@soha): 인원 텍스트 색 수정 필요 */}
          <Text size="bodyBold" color="sematic">
            총 N명
          </Text>
        </div>
        <div css={allMemberListModalLabelGroupInputStyle}>
          <LabelGroupInput labelText="이름">
            <InputAndDeleteButton />
          </LabelGroupInput>
        </div>
        <FixedButton children="수정 완료" />
      </div>
    </BottomSheet>
  );
};

export default SetAllMemberListModal;
