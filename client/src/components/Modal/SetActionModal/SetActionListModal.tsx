import type {InOutType} from 'types/serviceType';

import {useState} from 'react';
import {BottomSheet, Switch, Text} from 'haengdong-design';

import {AddMemberActionListModalContent} from './AddMemberActionListModalContent';
import style from './SetActionListModal.style';

export type ActionType = '지출' | '인원';

interface SetActionModalContentProps {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetActionListModal = ({isOpenBottomSheet, setIsOpenBottomSheet}: SetActionModalContentProps) => {
  const [inOutAction, setInOutAction] = useState<InOutType>('탈주');

  const handleParticipantTypeChange = (value: string) => {
    setInOutAction(value as InOutType);
  };

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
      <div css={style.container}>
        <div css={style.switchContainer}>
          <Text size="bodyBold" color="onTertiary">
            인원 변동
          </Text>
          <Switch values={['늦참', '탈주']} value={inOutAction} onChange={handleParticipantTypeChange} />
        </div>

        <AddMemberActionListModalContent
          inOutAction={inOutAction === '탈주' ? 'OUT' : 'IN'}
          setIsOpenBottomSheet={setIsOpenBottomSheet}
        />
      </div>
    </BottomSheet>
  );
};

export default SetActionListModal;
