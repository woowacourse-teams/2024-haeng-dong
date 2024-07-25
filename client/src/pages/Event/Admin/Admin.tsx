import {useEffect, useState} from 'react';
import {Title, FixedButton, StepItem} from 'haengdong-design';
import {useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';
import {requestGetEventName} from '@apis/request/event';
import useEventId from '@hooks/useEventId/useEventId';

import {SetActionModalContent, SetInitialParticipants} from '@components/Modal';

import {ReceiptStyle} from './Admin.style';

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
  memberNameList: string[];
  openBottomSheet: boolean;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRendering = ({memberNameList, openBottomSheet, setOrder, setOpenBottomSheet}: ModalRenderingProps) => {
  switch (memberNameList.length) {
    case 0:
      return <SetInitialParticipants setOpenBottomSheet={setOpenBottomSheet} openBottomSheet={openBottomSheet} />;

    default:
      return (
        <SetActionModalContent
          setOrder={setOrder}
          setOpenBottomSheet={setOpenBottomSheet}
          openBottomSheet={openBottomSheet}
        />
      );
  }
};

const Admin = () => {
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
        {order > 1 ? <StepList /> : <StepItem name={`${order}차`} bills={[]} personCount={memberNameList.length} />}
        {/* TODO: (@soha) 추후 버튼 width 화면에 맞게 수정 */}
        <FixedButton
          children={memberNameList.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
          onClick={() => setOpenBottomSheet(prev => !prev)}
        />
        {openBottomSheet && (
          <ModalRendering
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

export default Admin;
