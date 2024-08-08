import {BottomSheet, Text, LabelGroupInput, FixedButton, IconButton, Icon} from 'haengdong-design';

import validateMemberName from '@utils/validate/validateMemberName';

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
  const handleCloseAllMemberListModal = () => {
    setIsOpenAllMemberListButton(prev => !prev);
    setIsOpenBottomSheet(false);
  };

  const {
    editedAllMemberList,
    canSubmit,
    errorMessage,
    errorIndexList,
    handleNameChange,
    handleClickDeleteButton,
    handlePutAllMemberList,
  } = useSetAllMemberList({
    validateFunc: validateMemberName,
    allMemberList,
    handleCloseAllMemberListModal,
  });

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={handleCloseAllMemberListModal}>
      <div css={allMemberListModalStyle}>
        <div css={allMemberListModalTitleStyle}>
          <Text size="bodyBold">전체 참여자 수정하기</Text>
          {/* TODO: (@soha): 인원 텍스트 색 수정 필요 */}
          <Text size="bodyBold" textColor="gray">
            총 {allMemberList.length}명
          </Text>
        </div>
        <div css={allMemberListModalLabelGroupInputStyle}>
          <LabelGroupInput labelText="이름" errorText={errorMessage}>
            {editedAllMemberList.map((member, index) => (
              <div css={InputAndDeleteButtonContainer} key={index}>
                <div css={{flexGrow: 1}}>
                  <LabelGroupInput.Element
                    elementKey="e"
                    value={member}
                    isError={errorIndexList.includes(index)}
                    onChange={e => handleNameChange(index, e)}
                  />
                </div>
                <IconButton variants="tertiary" size="medium" onClick={() => handleClickDeleteButton(index)}>
                  <Icon iconType="trash" iconColor="onTertiary" />
                </IconButton>
              </div>
            ))}
          </LabelGroupInput>
        </div>
        <FixedButton children="수정 완료" disabled={!canSubmit} onClick={handlePutAllMemberList} />
      </div>
    </BottomSheet>
  );
};

export default SetAllMemberListModal;
