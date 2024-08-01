import {Text, Input, BottomSheet, FixedButton, LabelGroupInput} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialParticipants = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs, errorMessage, canSubmit} =
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
          <LabelGroupInput labelText="이름" errorText={errorMessage}>
            {inputs.map((input, index) => (
              // <LabelGroupInput.Element
              //   elementKey={`${index}`}
              //   key={`${index}`}
              //   type="text"
              //   value={input}
              //   ref={el => (inputRefs.current[index] = el)}
              //   onChange={e => handleInputChange(index, e)}
              //   onBlur={() => handleInputBlur(index)}
              //   isError={!!errorMessage}
              //   placeholder="이름"
              //   autoFocus
              // />
              <input
                // elementKey={`${index}`}
                key={`${index}`}
                type="text"
                value={input}
                ref={el => (inputRefs.current[index] = el)}
                onChange={e => handleInputChange(index, e)}
                onBlur={() => handleInputBlur(index)}
                // isError={!!errorMessage}
                placeholder="이름"
                autoFocus
              />
            ))}
          </LabelGroupInput>
        </div>
      </div>
      <FixedButton disabled={!canSubmit} variants={'primary'} onClick={handleSubmit} children={'인원 설정 완료'} />
    </BottomSheet>
  );
};

export default SetInitialParticipants;
