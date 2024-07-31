import {Text, Input, BottomSheet, FixedButton, LabelInput} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';

import useDynamicInput from '@hooks/useDynamicInput';

import validateMemberName from '@utils/validate/validateMemberName';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialParticipants = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs, errorMessage} =
    useDynamicInput(validateMemberName);
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
          <LabelInput labelText="이름" errorText={errorMessage}>
            {inputs.map((input, index) => (
              <Input
                key={index}
                type="text"
                value={input}
                ref={el => (inputRefs.current[index] = el)}
                onChange={e => handleInputChange(index, e)}
                onBlur={() => handleInputBlur(index)}
                autoFocus
              />
            ))}
          </LabelInput>
        </div>
      </div>
      <FixedButton
        disabled={!(inputs.length - 1)}
        variants={'primary'}
        onClick={handleSubmit}
        children={'인원 설정 완료'}
      />
    </BottomSheet>
  );
};

export default SetInitialParticipants;
