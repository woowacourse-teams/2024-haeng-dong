import {useState} from 'react';
import {css} from '@emotion/react';
import {TopNav, Title, FixedButton, StepItem, InOutItem, BottomSheet} from 'haengdong-design';

import {SetActionModalContent, SetInitialParticipants} from '@components/Modal';

import {EventStyle, ReceiptStyle} from './Event.style';

export type PurchaseInformation = {
  name: string;
  price: number;
};

type ParticipantType = {
  name: string;
  type: '늦참' | '탈주';
};

interface ModalRenderingProps {
  participants: string[];
  openBottomSheet: boolean;
  setEvent: (participants: string[]) => void;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRendering = ({participants, setEvent, setOpenBottomSheet, openBottomSheet}: ModalRenderingProps) => {
  switch (participants.length) {
    case 0:
      return (
        <SetInitialParticipants
          setEvent={setEvent}
          setOpenBottomSheet={setOpenBottomSheet}
          openBottomSheet={openBottomSheet}
        />
      );

    default:
      return <SetActionModalContent participants={participants} setOpenBottomSheet={setOpenBottomSheet} />;
  }
};

const Event = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [order, setOrder] = useState(0);

  const [purchaseInformation, setPurchaseInformation] = useState<(PurchaseInformation | ParticipantType)[]>([
    {
      name: '',
      price: 0,
    } as PurchaseInformation,
  ]);

  const setEvent = (participants: string[]) => {
    setParticipants(participants);
    setOrder(1);
  };

  return (
    <div css={EventStyle}>
      <TopNav navType={'home'} />
      <Title title="행동대장 야유회" description="“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요." />
      <section css={ReceiptStyle}>
        <StepItem
          name={`${order}차`}
          personCount={participants.length}
          bills={[
            {name: 'QWER', price: 12000, hasDragHandle: true},
            {name: '배고파요', price: 12000, hasDragHandle: true},
          ]}
        />
        <InOutItem names={['감자', '고구마']} inOutType="out" hasDragHandle={true} />
        {/* TODO: (@soha) 퍼블리싱을 위해 일단 주석처리 */}
        {/* {order > 0 && <></>} */}
        <FixedButton
          children={participants.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
          onClick={() => setOpenBottomSheet(prev => !prev)}
        />
        {openBottomSheet && ModalRendering({participants, setEvent, setOpenBottomSheet, openBottomSheet})}
      </section>
    </div>
  );
};

export default Event;
