import {useState} from 'react';

import {buttonStyle, inputStyle, plusButtonStyle} from './SetInitialParticipants.style';

interface SetInitialParticipantsProps {
  setParticipantsAndModalClose: (participants: string[]) => void;
}

const SetInitialParticipants = ({setParticipantsAndModalClose}: SetInitialParticipantsProps) => {
  const [value, setValue] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const addParticipants = (event: React.FormEvent<HTMLFormElement>) => {
    if (value === '') return;

    event.preventDefault();
    setParticipants(prev => [...prev, value]);
    setValue('');
  };

  return (
    <>
      <h2>초기 인원 설정하기</h2>
      {participants.map((participant, index) => (
        <input key={`${participant}-${index}`} type="text" value={participant} disabled />
      ))}
      <form onSubmit={addParticipants}>
        <input
          type="text"
          placeholder="이름"
          css={inputStyle}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button css={plusButtonStyle}>+</button>
      </form>
      <button
        css={buttonStyle(participants.length !== 0)}
        disabled={participants.length === 0}
        onClick={() => setParticipantsAndModalClose(participants)}
      >
        인원 설정 완료
      </button>
    </>
  );
};

export default SetInitialParticipants;
