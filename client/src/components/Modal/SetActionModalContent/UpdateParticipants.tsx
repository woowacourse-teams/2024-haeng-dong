import {Input, FixedButton, LabelGroupInput} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';

import {updateParticipantsInputStyle, updateParticipantsStyle} from './UpdateParticipants.style';

interface UpdateParticipantsProps {
  inOutAction: MemberType;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateParticipants = ({inOutAction, setOpenBottomSheet}: UpdateParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs, errorMessage, canSubmit} =
    useDynamicInput(validateMemberName);
  const {updateMemberList} = useStepList();

  const handleUpdateParticipantsSubmit = () => {
    updateMemberList({memberNameList: getNonEmptyInputs(), type: inOutAction});
    setOpenBottomSheet(false);
  };

  return (
    <div css={updateParticipantsStyle}>
      <div css={updateParticipantsInputStyle}>
        {/* TODO: (@soha) Search로 변경하기 */}
        <LabelGroupInput labelText="이름" errorText={errorMessage}>
          {inputs.map(({}, index) => (
            <LabelGroupInput.Element
              elementKey={`${index}`}
              value={`${name}`}
              type="text"
              ref={el => (inputRefs.current[index] = el)}
              onChange={e => handleInputChange(index, e)}
              onBlur={() => handleInputBlur(index)}
              placeholder="이름"
              autoFocus
            />
          ))}
        </LabelGroupInput>
      </div>
      <FixedButton
        disabled={!canSubmit}
        variants={'primary'}
        children={`${inputs.length - 1}명 ${inOutAction === 'OUT' ? '탈주' : '늦참'}`}
        onClick={handleUpdateParticipantsSubmit}
      />
    </div>
  );
};

export default UpdateParticipants;
