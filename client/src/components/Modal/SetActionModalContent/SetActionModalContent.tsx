import {useState} from 'react';
import {BottomSheet, Switch} from 'haengdong-design';

import {InOutType, ParticipantType, PurchaseInformation} from '@pages/Event/Event';

import {Switch} from '@components/Switch';

import SetPurchase from './SetPurchase';
import UpdateParticipants from './UpdateParticipants';
import {setActionModalContentStyle, setActionModalContentSwitchContainerStyle} from './SetActionModalContent.style';

type ActionType = '지출' | '인원';

interface SetActionModalContentProps {
  participants: string[];
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setEvent: (participants: string[]) => void;
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  purchaseInformation: (PurchaseInformation | ParticipantType)[];
  setPurchaseInformation: React.Dispatch<React.SetStateAction<(PurchaseInformation | ParticipantType)[]>>;
}

const SetActionModalContent = ({
  participants,
  openBottomSheet,
  setOpenBottomSheet,
  setEvent,
  setParticipants,
  purchaseInformation,
  setPurchaseInformation,
}: SetActionModalContentProps) => {
  const [action, setAction] = useState<ActionType>('지출');
  const [participantAction, setParticipantAction] = useState<InOutType>('늦참');

  const handleActionTypeChange = (value: string) => {
    setAction(value as ActionType);
  };

  const handleParticipantTypeChange = (value: string) => {
    setParticipantAction(value as InOutType);
  };
  return (
    <BottomSheet
      isOpened={openBottomSheet}
      onChangeClose={() => setOpenBottomSheet(false)}
      onClick={() => setEvent(participants)}
    >
      <div css={setActionModalContentStyle}>
        <div css={setActionModalContentSwitchContainerStyle}>
          <Switch value={action} onChange={handleActionTypeChange} values={['지출', '인원']} />
          {action === '인원' && (
            <Switch values={['늦참', '탈주']} value={participantAction} onChange={handleParticipantTypeChange} />
          )}
        </div>

        {action === '지출' && (
          <SetPurchase
            setOpen={setOpenBottomSheet}
            setPurchaseInformation={setPurchaseInformation}
            purchaseInformation={purchaseInformation}
          />
        )}
        {action === '인원' && (
          <UpdateParticipants
            setOpen={setOpenBottomSheet}
            participantType={participantAction}
            participants={participants}
            setParticipants={setParticipants}
            setPurchaseInformation={setPurchaseInformation}
            purchaseInformation={purchaseInformation}
          />
        )}
      </div>
    </BottomSheet>
  );
};

export default SetActionModalContent;
