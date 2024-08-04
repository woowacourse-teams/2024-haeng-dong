import {useEffect, useState} from 'react';
import {Title, FixedButton} from 'haengdong-design';

import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';
import {requestGetEventName} from '@apis/request/event';
import useEventId from '@hooks/useEventId/useEventId';

import {SetActionListModal, SetInitialMemberListModal} from '@components/Modal';

import {ReceiptStyle} from './AdminPage.style';

interface ModalBasedOnMemberCountProps {
  memberNameList: string[];
  openBottomSheet: boolean;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBasedOnMemberCount = ({
  memberNameList,
  openBottomSheet,
  setOrder,
  setOpenBottomSheet,
}: ModalBasedOnMemberCountProps) => {
  switch (memberNameList.length) {
    case 0:
      return <SetInitialMemberListModal setOpenBottomSheet={setOpenBottomSheet} openBottomSheet={openBottomSheet} />;

    default:
      return (
        <SetActionListModal
          setOrder={setOrder}
          setOpenBottomSheet={setOpenBottomSheet}
          openBottomSheet={openBottomSheet}
        />
      );
  }
};

const AdminPage = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [order, setOrder] = useState<number>(1);

  // TODO: (@weadie) eventName이 새로고침시 공간이 없다가 생겨나 레이아웃이 움직이는 문제
  const [eventName, setEventName] = useState(' ');

  const {getTotalPrice, memberNameList} = useStepList();

  const {eventId} = useEventId();

  // TODO: (@weadie) 아래 로직을 훅으로 분리합니다.
  useEffect(() => {
    if (eventId === '') return;

    const getEventName = async () => {
      const {eventName} = await requestGetEventName({eventId: eventId ?? ''});

      setEventName(eventName);
    };

    getEventName();
  }, [eventId]);

  return (
    <>
      <Title
        title={eventName}
        description="“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요."
        price={getTotalPrice()}
      />
      <section css={ReceiptStyle}>
        <StepList />
        {/* TODO: (@soha) 추후 버튼 width 화면에 맞게 수정 */}
        <FixedButton
          children={memberNameList.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
          onClick={() => setOpenBottomSheet(prev => !prev)}
        />
        {openBottomSheet && (
          <ModalBasedOnMemberCount
            memberNameList={memberNameList}
            setOrder={setOrder}
            setOpenBottomSheet={setOpenBottomSheet}
            openBottomSheet={openBottomSheet}
          />
        )}
      </section>
    </>
  );
};

export default AdminPage;
