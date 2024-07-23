import {useState} from 'react';
import {Text, Input, BottomSheet} from 'haengdong-design';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  setParticipantsAndModalClose: (participants: string[]) => void;
}

const SetInitialParticipants = () => {
  // const SetInitialParticipants = ({setParticipantsAndModalClose}: SetInitialParticipantsProps) => {
  const [value, setValue] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const addParticipants = (event: React.FormEvent<HTMLFormElement>) => {
    if (value === '') return;

    event.preventDefault();
    setParticipants(prev => [...prev, value]);
    setValue('');
  };

  console.log('!!');

  return (
    <div css={setInitialParticipantsStyle}>
      <Text size="bodyBold">초기 인원 설정하기</Text>
      {/* TODO: (@soha) InputGroup은 scroll 가능, Text는 고정 css 추가해야 함 */}
      <form onSubmit={addParticipants} css={setInitialParticipantsInputGroupStyle}>
        {/* TODO: (@soha) 값 입력후 blur시 다음 Input 컴포넌트 생성 */}
        <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
        <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
      </form>
    </div>
    // <BottomSheet
    // // fixedButtonProps={{variants: 'primary', children: '하단 고정 버튼'}}
    // // isOpened={true}
    // // fixedButtonText="인원 설정 완료"
    // // fixedButtonVariants={participants.length ? 'primary' : 'tertiary'}
    // // onClick={() => setParticipantsAndModalClose(participants)}
    // >
    // </BottomSheet>
  );
};

export default SetInitialParticipants;
