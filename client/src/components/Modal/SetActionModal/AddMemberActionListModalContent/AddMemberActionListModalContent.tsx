import {FixedButton, LabelGroupInput} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';
import style from './AddMemberActionListModalContent.style';

interface UpdateParticipantsProps {
  inOutAction: MemberType;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberActionListModalContent = ({inOutAction, setOpenBottomSheet}: UpdateParticipantsProps) => {
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

  const handleUpdateParticipantsSubmit = () => {
    updateMemberList({memberNameList: getFilledInputList().map(({value}) => value), type: inOutAction});
    setOpenBottomSheet(false);
  };

  return (
    <div css={style.container}>
      <div css={style.inputGroup}>
        {/* TODO: (@soha) Search로 변경하기 */}
        <LabelGroupInput labelText="이름" errorText={errorMessage}>
          {inputList.map(({value, index}) => (
            <LabelGroupInput.Element
              key={`${index}`}
              elementKey={`${index}`}
              type="text"
              value={`${value}`}
              ref={el => (inputRefList.current[index] = el)}
              onChange={e => handleInputChange(index, e)}
              onBlur={() => deleteEmptyInputElementOnBlur()}
              onKeyDown={e => focusNextInputOnEnter(e, index)}
              placeholder="이름"
            />
          ))}
        </LabelGroupInput>
      </div>
      <FixedButton
        disabled={!canSubmit}
        variants={'primary'}
        children={`${inputList.length - 1}명 ${inOutAction === 'OUT' ? '탈주' : '늦참'}`}
        onClick={handleUpdateParticipantsSubmit}
      />
    </div>
  );
};

export default AddMemberActionListModalContent;
