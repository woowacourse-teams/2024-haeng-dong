import {useState} from 'react';

interface UpdateParticipantsProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  participantType: string;
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  setPurchaseInformation: any;
  purchaseInformation: any;
}

const UpdateParticipants = ({
  setPurchaseInformation,
  purchaseInformation,
  setOpen,
  participantType,
  participants,
  setParticipants,
}: UpdateParticipantsProps) => {
  const [name, setName] = useState('');

  const updateParticipant = () => {
    if (participantType === '늦참') {
      if (participants.includes(name)) {
        alert('이미 있는 사용자입니다.');
        return;
      }

      setParticipants([...participants, name]);
      setPurchaseInformation([...purchaseInformation, {name, type: '늦참'}]);
    } else if (participantType === '탈주') {
      if (!participants.includes(name)) {
        alert('그런 사용자는 없습니다. 올바른 이름을 입력해주세요.');
        return;
      }

      setParticipants(prev => prev.filter(participant => participant !== name));
      setPurchaseInformation([...purchaseInformation, {name, type: '탈주'}]);
    }

    setName('');
    setOpen(false);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input onChange={event => setName(event.target.value)} value={name} />
      <button onClick={updateParticipant}>{participantType} 인원 확정</button>
    </div>
  );
};

export default UpdateParticipants;
