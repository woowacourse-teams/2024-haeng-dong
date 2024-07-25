import {Input, FixedButton} from 'haengdong-design';
import {useState} from 'react';

import {InOutType} from '@pages/Event/Event';
import {useStepList} from '@hooks/useStepList/useStepList';
import {MemberType} from 'types/stepList';

import useDynamicInput from '@hooks/useDynamicAdditionalInput';

import {updateParticipantsInputStyle, updateParticipantsStyle} from './UpdateParticipants.style';

interface UpdateParticipantsProps {
  participants: string[];
  participantAction: InOutType;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateParticipants = ({participantAction, participants, setOpenBottomSheet}: UpdateParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs} = useDynamicInput();
  const {updateMemberList} = useStepList();

  const [inOutAction, setInOutAction] = useState<MemberType>('OUT');

  const handleUpdateParticipantsSubmit = () => {
    const newParticipants = () => {
      if (participantAction === '탈주') {
        setInOutAction('OUT');
        return participants.filter(participant => !getNonEmptyInputs().includes(participant));
      } else {
        setInOutAction('IN');
        return [...participants, ...getNonEmptyInputs()];
      }
    };

    updateMemberList({memberNameList: newParticipants(), type: inOutAction});
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
        variants={inputs.length - 1 ? 'primary' : 'tertiary'}
        children={`${inputs.length - 1}명 ${participantAction}`}
        onClick={handleUpdateParticipantsSubmit}
      />
    </div>
  );
};

export default UpdateParticipants;
