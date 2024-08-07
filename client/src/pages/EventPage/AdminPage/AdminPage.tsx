import {useEffect, useState} from 'react';
import {Title, FixedButton, ListButton} from 'haengdong-design';

import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';
import {requestGetEventName} from '@apis/request/event';
import useEventId from '@hooks/useEventId/useEventId';

import {SetActionListModal, SetInitialMemberListModal, SetAllMemberListModal} from '@components/Modal';

import {receiptStyle, titleAndListButtonContainerStyle} from './AdminPage.style';

interface ModalBasedOnMemberCountProps {
  memberNameList: string[];
  openBottomSheet: boolean;
  isClickAllMemberListButton: boolean;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBasedOnMemberCount = ({
  memberNameList,
  openBottomSheet,
  isClickAllMemberListButton,
  setOrder,
  setOpenBottomSheet,
  setIsClickAllMemberListButton,
}: ModalBasedOnMemberCountProps) => {
  if (isClickAllMemberListButton) {
    return (
      <SetAllMemberListModal
        setOpenBottomSheet={setOpenBottomSheet}
        openBottomSheet={openBottomSheet}
        setIsClickAllMemberListButton={setIsClickAllMemberListButton}
      />
    );
  }
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
  const [isClickAllMemberListButton, setIsClickAllMemberListButton] = useState(false);

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

  const handleOpenAllMemberListButton = () => {
    setOpenBottomSheet(prev => !prev);
    setIsClickAllMemberListButton(prev => !prev);
  };

  return (
    <>
      <div css={titleAndListButtonContainerStyle}>
        <Title
          title={eventName}
          description="“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요."
          price={getTotalPrice()}
        />
        {memberNameList.length !== 0 && (
          <ListButton
            prefix="전체 참여자"
            suffix={`${memberNameList.length}명`}
            onClick={handleOpenAllMemberListButton}
          />
        )}
      </div>
      <section css={receiptStyle}>
        <StepList />
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
            isClickAllMemberListButton={isClickAllMemberListButton}
            setIsClickAllMemberListButton={setIsClickAllMemberListButton}
          />
        )}
      </section>
    </>
  );
};

export default AdminPage;
