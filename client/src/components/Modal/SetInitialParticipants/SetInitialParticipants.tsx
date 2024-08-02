import {Text, BottomSheet, FixedButton, LabelGroupInput} from 'haengdong-design';
import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialParticipants = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getFilledInputList, errorMessage, canSubmit} =
    useDynamicInput(validateMemberName);
  const {updateMemberList} = useStepList();

  const handleSubmit = () => {
    updateMemberList({memberNameList: getFilledInputList(), type: 'IN'});
    setOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={openBottomSheet} onChangeClose={() => setOpenBottomSheet(false)}>
      <div css={setInitialParticipantsStyle}>
        <Text size="bodyBold">초기 인원 설정하기</Text>
        <div css={setInitialParticipantsInputGroupStyle}>
          <LabelGroupInput labelText="이름" errorText={'d'}>
            {inputs.map(({value, index}) => (
              <LabelGroupInput.Element
                id={`${index}`} // 확인용도 임시임
                key={`${index}`}
                elementKey={`${index}`}
                type="text"
                value={value}
                ref={el => (inputRefs.current[index] = el)}
                onChange={e => handleInputChange(index, e)}
                onBlur={() => handleInputBlur(index)}
                onKeyDown={e => {
                  if (e.nativeEvent.isComposing) return;

                  if (e.key === 'Enter') {
                    if (index < inputs.length - 1) {
                      inputRefs.current[index + 1]?.focus();
                    }
                  }
                }}
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
