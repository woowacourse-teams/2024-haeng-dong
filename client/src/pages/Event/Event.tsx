import {useContext, useEffect, useState} from 'react';
import {TopNav, Title, FixedButton, MainLayout, NavSwitch} from 'haengdong-design';
import {useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import {StepListContext} from '@hooks/useStepList/useStepList';
import {requestGetEventName} from '@apis/request/event';
import useEventId from '@hooks/useEventId/useEventId';

import {SetActionModalContent, SetInitialParticipants} from '@components/Modal';

import {ReceiptStyle} from './Event.style';

export type PurchaseInformation = {
  title: string;
  price: number;
};

export type InOutType = '늦참' | '탈주';

export type ParticipantType = {
  name: string;
  type: InOutType;
};

interface ModalRenderingProps {
  participants: string[];
  openBottomSheet: boolean;

  setOrder: React.Dispatch<React.SetStateAction<number>>;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModalRendering = ({
  participants,
  setOrder,
  setOpenBottomSheet,
  setParticipants,
  openBottomSheet,
}: ModalRenderingProps) => {
  switch (participants.length) {
    case 0:
      return (
        <SetInitialParticipants
          setParticipants={setParticipants}
          setOpenBottomSheet={setOpenBottomSheet}
          openBottomSheet={openBottomSheet}
        />
      );

    default:
      return (
        <SetActionModalContent
          setOrder={setOrder}
          participants={participants}
          setOpenBottomSheet={setOpenBottomSheet}
          openBottomSheet={openBottomSheet}
        />
      );
  }
};

const Event = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [order, setOrder] = useState<number>(0);

  // TODO: (@weadie) eventName이 새로고침시 공간이 없다가 생겨나 레이아웃이 움직이는 문제
  const [eventName, setEventName] = useState(' ');
  const navigate = useNavigate();

  const {getTotalPrice} = useContext(StepListContext);

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

  const basePath = location.pathname.split('/').slice(0, -1).join('/');

  const PATH_TABLE: Record<string, string> = {
    홈: 'home',
    관리: 'admin',
  };

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <NavSwitch
          paths={['홈', '관리']}
          defaultPath={'홈'}
          onChange={(value: string) => {
            navigate(`${basePath}/${PATH_TABLE[value]}`);
          }}
        />
      </TopNav>
      <Title
        title={eventName}
        description="“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요."
        price={getTotalPrice()}
      />
      <section css={ReceiptStyle}>
        {order > 0 && (
          //  TODO: (@soha) order가 0일때 기본 Step 뜨기
          <StepList />
        )}
        {/* TODO: (@soha) 추후 버튼 width 화면에 맞게 수정 */}
        <FixedButton
          children={participants.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
          onClick={() => setOpenBottomSheet(prev => !prev)}
        />
        {openBottomSheet && (
          <ModalRendering
            participants={participants}
            setOrder={setOrder}
            setParticipants={setParticipants}
            setOpenBottomSheet={setOpenBottomSheet}
            openBottomSheet={openBottomSheet}
          />
        )}
      </section>
    </MainLayout>
  );
};

export default Event;
