import {useState} from 'react';
import {Text, Input, BottomSheet, FixedButton} from 'haengdong-design';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setEvent: (participants: string[]) => void;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialParticipants = ({openBottomSheet, setEvent, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const [value, setValue] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const addParticipants = (event: React.FormEvent<HTMLFormElement>) => {
    if (value === '') return;

    event.preventDefault();
    setParticipants(prev => [...prev, value]);
    setValue('');
  };

  return (
    <BottomSheet
      isOpened={openBottomSheet}
      onChangeClose={() => setOpenBottomSheet(false)}
      onClick={() => setEvent(participants)}
    >
      <div css={setInitialParticipantsStyle}>
        <Text size="bodyBold">초기 인원 설정하기</Text>
        <form onSubmit={addParticipants} css={setInitialParticipantsInputGroupStyle}>
          {/* TODO: (@soha) 값 입력후 blur시 다음 Input 컴포넌트 생성 */}
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Input placeholder="이름" type="text" value={value} onChange={event => setValue(event.target.value)} />
          <Text>ddfsdfsa</Text>
        </form>
      </div>
      <FixedButton
        variants={participants.length ? 'primary' : 'tertiary'}
        onClick={() => setEvent(participants)}
        children={'인원 설정 완료'}
      />
    </BottomSheet>
  );
};

export default SetInitialParticipants;
