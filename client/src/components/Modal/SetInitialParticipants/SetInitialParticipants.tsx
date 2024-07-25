import {Text, Input, BottomSheet, FixedButton} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';

import useDynamicInput from '@hooks/useDynamicAdditionalInput';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialParticipants = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs} = useDynamicInput();
  const {updateMemberList} = useStepList();

  const handleSubmit = () => {
    updateMemberList({memberNameList: getNonEmptyInputs(), type: 'IN'});
    setOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={openBottomSheet} onChangeClose={() => setOpenBottomSheet(false)}>
      <div css={setInitialParticipantsStyle}>
        <Text size="bodyBold">초기 인원 설정하기</Text>
        <div css={setInitialParticipantsInputGroupStyle}>
          {inputs.map((participant, index) => (
            <Input
              key={index}
              placeholder="이름"
              type="text"
              value={participant}
              ref={el => (inputRefs.current[index] = el)}
              onChange={e => handleInputChange(index, e.target.value)}
              onBlur={() => handleInputBlur(index)}
            />
          ))}
        </div>
      </div>
      <FixedButton
        variants={inputs.length - 1 ? 'primary' : 'tertiary'}
        onClick={handleSubmit}
        children={'인원 설정 완료'}
      />
    </BottomSheet>
  );
};

export default SetInitialParticipants;
