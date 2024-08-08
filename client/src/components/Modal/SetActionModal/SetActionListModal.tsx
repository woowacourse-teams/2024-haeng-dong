import type {InOutType} from 'types/serviceType';

import {useState} from 'react';
import {BottomSheet, Switch} from 'haengdong-design';

import {AddBillActionListModalContent} from './AddBillActionListModalContent';
import {AddMemberActionListModalContent} from './AddMemberActionListModalContent';
import style from './SetActionListModal.style';

export type ActionType = '지출' | '인원';

interface SetActionModalContentProps {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
}

const SetActionListModal = ({isOpenBottomSheet, setIsOpenBottomSheet, setOrder}: SetActionModalContentProps) => {
  const [action, setAction] = useState<ActionType>('지출');
  const [inOutAction, setInOutAction] = useState<InOutType>('탈주');

  const handleActionTypeChange = (value: string) => {
    setAction(value as ActionType);
  };

  const handleParticipantTypeChange = (value: string) => {
    setInOutAction(value as InOutType);
  };

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
      <div css={style.container}>
        <div css={style.switchContainer}>
          <Switch value={action} onChange={handleActionTypeChange} values={['지출', '인원']} />
          {action === '인원' && (
            <Switch values={['늦참', '탈주']} value={inOutAction} onChange={handleParticipantTypeChange} />
          )}
        </div>

        {action === '지출' && (
          <AddBillActionListModalContent setIsOpenBottomSheet={setIsOpenBottomSheet} setOrder={setOrder} />
        )}
        {action === '인원' && (
          <AddMemberActionListModalContent
            inOutAction={inOutAction === '탈주' ? 'OUT' : 'IN'}
            setIsOpenBottomSheet={setIsOpenBottomSheet}
          />
        )}
      </div>
    </BottomSheet>
  );
};

export default SetActionListModal;
