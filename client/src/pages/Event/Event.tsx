import {useState} from 'react';
import {TopNav, Title, FixedButton, StepItem, InOutItem, MainLayout} from 'haengdong-design';

import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';
import {StepListProvider} from '@hooks/useStepList/useStepList';

import {SetActionModalContent, SetInitialParticipants} from '@components/Modal';

import {ReceiptStyle} from './Event.style';

export type PurchaseInformation = {
  name: string;
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

  const {getTotalPrice} = useStepList();

  return (
    <MainLayout backgroundColor="gray">
      <TopNav navType={'home'} />
      <Title
        title="행동대장 야유회"
        description="“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요."
        price={getTotalPrice()}
      />
      <section css={ReceiptStyle}>
        {order > 0 && (
          //  TODO: (@soha) order가 0일때 기본 Step 뜨기
          <StepListProvider>
            <StepList />
          </StepListProvider>
        )}
        {/* TODO: (@soha) 추후 버튼 width 화면에 맞게 수정 */}
        <FixedButton
          children={participants.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
          onClick={() => setOpenBottomSheet(prev => !prev)}
        />
        {openBottomSheet &&
          ModalRendering({
            participants,
            setOrder,
            setParticipants,
            setOpenBottomSheet,
            openBottomSheet,
          })}
      </section>
    </MainLayout>
  );
};

export default Event;
