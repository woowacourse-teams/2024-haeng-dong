import {useState} from 'react';
import {css} from '@emotion/react';
import {TopNav, Title, FixedButton, StepItem, InOutItem} from 'haengdong-design';

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
  setParticipantsAndModalClose: (participants: string[]) => void;
}

const ModalRendering = ({participants, setParticipantsAndModalClose}: ModalRenderingProps) => {
  switch (participants.length) {
    case 0:
      return <SetInitialParticipants setParticipantsAndModalClose={setParticipantsAndModalClose} />;

    default:
      return <SetActionModalContent participants={participants} />;
  }
};

const Event = () => {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [order, setOrder] = useState(0);

  const [purchaseInformation, setPurchaseInformation] = useState<(PurchaseInformation | ParticipantType)[]>([
    {
      name: '',
      price: 0,
    } as PurchaseInformation,
  ]);

  const setParticipantsAndModalClose = (participants: string[]) => {
    setParticipants(participants);
    setOrder(1);
    setOpen(false);
  };

  // TODO: (@soha) BottomSheet 확인을 위한 console. 추후 삭제 예정
  console.log('par: ', participants.length);
  console.log(open);

  return (
    <div css={EventStyle}>
      {/* TODO: (@soha) TopNav 에러로 인해 임시로 div 만들어서 사용 */}
      <div css={css({height: '24px'})}>홈 | 관리</div>
      {/* <TopNav navType={'home'} /> */}
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
          onClick={() => setOpen(prev => !prev)}
        />
        {open && ModalRendering({participants, setParticipantsAndModalClose})}
      </section>
    </div>
  );
};

export default Event;
