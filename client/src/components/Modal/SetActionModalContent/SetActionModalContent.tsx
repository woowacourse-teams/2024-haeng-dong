import {useState} from 'react';
import {BottomSheet, Switch} from 'haengdong-design';

import {InOutType} from '@pages/Event/Admin/Admin';

import SetPurchase from './SetPurchase';
import UpdateParticipants from './UpdateParticipants';
import {setActionModalContentStyle, setActionModalContentSwitchContainerStyle} from './SetActionModalContent.style';

export type ActionType = '지출' | '인원';

interface SetActionModalContentProps {
  openBottomSheet: boolean;

  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
}

const SetActionModalContent = ({
  openBottomSheet,

  setOpenBottomSheet,
  setOrder,
}: SetActionModalContentProps) => {
  const [action, setAction] = useState<ActionType>('지출');
  const [inOutAction, setInOutAction] = useState<InOutType>('탈주');

  const handleActionTypeChange = (value: string) => {
    setAction(value as ActionType);
  };

  const handleParticipantTypeChange = (value: string) => {
    setInOutAction(value as InOutType);
  };

  return (
    <BottomSheet isOpened={openBottomSheet} onChangeClose={() => setOpenBottomSheet(false)}>
      <div css={setActionModalContentStyle}>
        <div css={setActionModalContentSwitchContainerStyle}>
          <Switch value={action} onChange={handleActionTypeChange} values={['지출', '인원']} />
          {action === '인원' && (
            <Switch values={['늦참', '탈주']} value={inOutAction} onChange={handleParticipantTypeChange} />
          )}
        </div>

        {action === '지출' && <SetPurchase setOpenBottomSheet={setOpenBottomSheet} setOrder={setOrder} />}
        {action === '인원' && (
          <UpdateParticipants
            inOutAction={inOutAction === '탈주' ? 'OUT' : 'IN'}
            setOpenBottomSheet={setOpenBottomSheet}
          />
        )}
      </div>
    </BottomSheet>
  );
};

export default SetActionModalContent;
