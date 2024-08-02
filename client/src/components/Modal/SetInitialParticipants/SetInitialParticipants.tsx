import {Text, BottomSheet, FixedButton} from 'haengdong-design';
import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';
import LabelGroupInputContainer from './GroupInput';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialParticipants = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getFilledInputList, errorMessage} =
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
          <LabelGroupInputContainer labelText="이름" errorText={'d'}>
            {inputs.map(({value, index}) => (
              <>
                <LabelGroupInputContainer.Element
                  // autoFocus
                  id={String(index)} // 확인용도 임시임
                  key={String(index)}
                  elementKey={String(index)}
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
                <div>
                  {value} | {index}
                </div>
              </>
            ))}
          </LabelGroupInputContainer>
        </div>
      </div>
      <FixedButton disabled={!canSubmit} variants={'primary'} onClick={handleSubmit} children={'인원 설정 완료'} />
    </BottomSheet>
  );
};

export default SetInitialParticipants;
