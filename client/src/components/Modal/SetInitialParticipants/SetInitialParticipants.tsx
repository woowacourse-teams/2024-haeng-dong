import {Text, Input, BottomSheet, FixedButton} from 'haengdong-design';

import useDynamicInput from '@hooks/useDynamicAdditionalInput';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
}

const SetInitialParticipants = ({
  openBottomSheet,
  setOpenBottomSheet,
  setParticipants,
}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs} = useDynamicInput();

  const handleSubmit = () => {
    setParticipants(getNonEmptyInputs());
    // TODO:  (@soha) api 요청시 getNonEmptyInputs() 보낼 형태 생성
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
