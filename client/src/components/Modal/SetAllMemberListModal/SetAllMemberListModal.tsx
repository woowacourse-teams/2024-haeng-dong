import {BottomSheet, Text, LabelGroupInput, FixedButton, IconButton, Icon} from 'haengdong-design';
import InputAndDeleteButton from '@components/InputAndDeleteButton/InputAndDeleteButton';

import useSetAllMemberList from '@hooks/useSetAllMemberList';

import {
  allMemberListModalLabelGroupInputStyle,
  allMemberListModalStyle,
  allMemberListModalTitleStyle,
  InputAndDeleteButtonContainer,
} from './SetAllMemberListModal.style';

interface SetAllMemberListModalProps {
  isOpenBottomSheet: boolean;
  allMemberList: string[];
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetAllMemberListModal = ({
  isOpenBottomSheet,
  allMemberList,
  setIsOpenBottomSheet,
  setIsOpenAllMemberListButton,
}: SetAllMemberListModalProps) => {
  const {editedAllMemberList, handleNameChange} = useSetAllMemberList({allMemberList});

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
            총 {allMemberList.length}명
          </Text>
        </div>
        <div css={allMemberListModalLabelGroupInputStyle}>
          <LabelGroupInput labelText="이름">
            {editedAllMemberList.map((member, index) => (
              <div css={InputAndDeleteButtonContainer}>
                <div css={{flexGrow: 1}}>
                  <LabelGroupInput.Element elementKey="e" value={member} onChange={e => handleNameChange(index, e)} />
                </div>
                <IconButton variants="tertiary" size="medium">
                  <Icon iconType="trash" iconColor="onTertiary" />
                </IconButton>
              </div>
            ))}
          </LabelGroupInput>
        </div>
        <FixedButton children="수정 완료" />
      </div>
    </BottomSheet>
  );
};

export default SetAllMemberListModal;
