import {Text, BottomSheet, FixedButton, LabelGroupInput} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';

import {
  setInitialMemberListModalInputGroupStyle,
  setInitialMemberListModalStyle,
} from './SetInitialMemberListModal.style';

interface SetInitialMemberListProps {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialMemberListModal = ({isOpenBottomSheet, setIsOpenBottomSheet}: SetInitialMemberListProps) => {
  const {
    inputList,
    inputRefList,
    handleInputChange,
    deleteEmptyInputElementOnBlur,
    getFilledInputList,
    errorMessage,
    canSubmit,
    focusNextInputOnEnter,
  } = useDynamicInput(validateMemberName);
  const {updateMemberList} = useStepList();

  const handleSubmit = () => {
    updateMemberList({memberNameList: getFilledInputList().map(({value}) => value), type: 'IN'});
    setIsOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
      <div css={setInitialMemberListModalStyle}>
        <Text size="bodyBold">초기 인원 설정하기</Text>
        <div css={setInitialMemberListModalInputGroupStyle}>
          <LabelGroupInput labelText="이름" errorText={errorMessage}>
            {inputList.map(({value, index}) => (
              <LabelGroupInput.Element
                key={`${index}`}
                elementKey={`${index}`}
                type="text"
                value={value}
                ref={el => (inputRefList.current[index] = el)}
                onChange={e => handleInputChange(index, e)}
                onBlur={() => deleteEmptyInputElementOnBlur()}
                onKeyDown={e => focusNextInputOnEnter(e, index)}
              />
            ))}
          </LabelGroupInput>
        </div>
      </div>
      <FixedButton disabled={!canSubmit} variants={'primary'} onClick={handleSubmit} children={'인원 설정 완료'} />
    </BottomSheet>
  );
};

export default SetInitialMemberListModal;
