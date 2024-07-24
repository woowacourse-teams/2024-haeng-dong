import {useState} from 'react';
import {BottomSheet, Switch} from 'haengdong-design';

import {InOutType, ParticipantType, PurchaseInformation} from '@pages/Event/Event';

import SetPurchase from './SetPurchase';
import UpdateParticipants from './UpdateParticipants';
import {setActionModalContentStyle, setActionModalContentSwitchContainerStyle} from './SetActionModalContent.style';

export type ActionType = '지출' | '인원';

interface SetActionModalContentProps {
  participants: string[];
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setEvent: (participants: string[]) => void;
}

const SetActionModalContent = ({
  participants,
  openBottomSheet,
  setOpenBottomSheet,
  setEvent,
}: SetActionModalContentProps) => {
  const [action, setAction] = useState<ActionType>('지출');
  const [participantAction, setParticipantAction] = useState<InOutType>('탈주');

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

        {action === '지출' && <SetPurchase setOpenBottomSheet={setOpenBottomSheet} />}
        {action === '인원' && (
          <UpdateParticipants
            participantAction={participantAction}
            participants={participants}
            setOpenBottomSheet={setOpenBottomSheet}
          />
        )}
      </div>
    </BottomSheet>
  );
};

export default SetActionModalContent;
