import {PurchaseInformation} from '../../../pages/Event/Event';
import {Switch} from '../../../components/Switch';
import SetPurchase from './SetPurchase';
import {useState} from 'react';
import UpdateParticipants from './UpdateParticipants';
import {switchContainerStyle} from './SetActionModalContent.style';

// type ActionType = '지출' | '인원';

interface SetActionModalContentProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  purchaseInformation: PurchaseInformation;
  setPurchaseInformation: React.Dispatch<React.SetStateAction<PurchaseInformation>>;
}

const SetActionModalContent = ({
  setOpen,
  participants,
  setParticipants,
  purchaseInformation,
  setPurchaseInformation,
}: SetActionModalContentProps) => {
  const [actionType, setActionType] = useState('지출');
  const [participantType, setParticipantType] = useState('늦참');

  return (
    <>
      <div css={switchContainerStyle}>
        <Switch buttonList={['지출', '인원']} curSwitch={actionType} setSwitch={setActionType} />
        {actionType === '인원' && (
          <Switch buttonList={['늦참', '탈주']} curSwitch={participantType} setSwitch={setParticipantType} />
        )}
      </div>

      {actionType === '지출' && (
        <SetPurchase setPurchaseInformation={setPurchaseInformation} purchaseInformation={purchaseInformation} />
      )}
      {actionType === '인원' && (
        <UpdateParticipants
          setOpen={setOpen}
          participantType={participantType}
          participants={participants}
          setParticipants={setParticipants}
        />
      )}
    </>
  );
};

export default SetActionModalContent;
