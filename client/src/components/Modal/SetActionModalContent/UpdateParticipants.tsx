import {Input, FixedButton} from 'haengdong-design';
import {useState} from 'react';

import {useStepList} from '@hooks/useStepList/useStepList';
import {MemberType} from 'types/stepList';

import useDynamicInput from '@hooks/useDynamicAdditionalInput';

import {updateParticipantsInputStyle, updateParticipantsStyle} from './UpdateParticipants.style';

interface UpdateParticipantsProps {
  inOutAction: MemberType;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateParticipants = ({inOutAction, setOpenBottomSheet}: UpdateParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs} = useDynamicInput();
  const {updateMemberList} = useStepList();

  const handleUpdateParticipantsSubmit = () => {
    updateMemberList({memberNameList: getNonEmptyInputs(), type: inOutAction});
    setOpenBottomSheet(false);
  };

  return (
    <div css={updateParticipantsStyle}>
      <div css={updateParticipantsInputStyle}>
        {/* TODO: (@soha) Search로 변경하기 */}
        {inputs.map((name, index) => (
          <Input
            key={index}
            placeholder="이름"
            value={name}
            type="text"
            ref={el => (inputRefs.current[index] = el)}
            onChange={e => handleInputChange(index, e.target.value)}
            onBlur={() => handleInputBlur(index)}
          />
        ))}
      </div>
      <FixedButton
        disabled={!(inputs.length - 1)}
        variants={'primary'}
        children={`${inputs.length - 1}명 ${inOutAction === 'OUT' ? '탈주' : '늦참'}`}
        onClick={handleUpdateParticipantsSubmit}
      />
    </div>
  );
};

export default UpdateParticipants;
