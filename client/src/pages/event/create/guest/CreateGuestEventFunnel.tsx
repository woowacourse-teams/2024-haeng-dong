import {useNavigate} from 'react-router-dom';

import useCreateGuestEventData from '@hooks/createEvent/useCreateGuestEventData';

import useFunnel from '@hooks/useFunnel';

import {MainLayout, TopNav} from '@components/Design';

import CompleteCreateEventStep from '../CompleteCreateEventStep';

import SetGuestEventNameStep from './SetGuestEventNameStep';
import SetEventPasswordStep from './SetEventPasswordStep';
import SetNicknameStep from './SetNickNameStep';

type CreateGuestEventStep = 'eventName' | 'adminName' | 'eventPassword' | 'complete';
const STEP_SEQUENCE: CreateGuestEventStep[] = ['eventName', 'adminName', 'eventPassword', 'complete'];

const CreateGuestEventFunnel = () => {
  const navigate = useNavigate();
  const {moveToNextStep, moveToPrevStep, Funnel, step} = useFunnel({
    defaultStep: 'eventName',
    stepList: STEP_SEQUENCE,
  });

  const {eventNameProps, nicknameProps, eventToken, setEventToken} = useCreateGuestEventData();

  const handleBack = () => {
    if (step === STEP_SEQUENCE[0]) {
      navigate('/');
    } else {
      moveToPrevStep();
    }
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          step !== STEP_SEQUENCE[STEP_SEQUENCE.length - 1] && (
            <TopNav.Text isEmphasis={false} onClick={handleBack}>
              뒤로가기
            </TopNav.Text>
          )
        }
      ></TopNav>
      <Funnel step={step}>
        <Funnel.Step name="eventName">
          <SetGuestEventNameStep moveToNextStep={moveToNextStep} {...eventNameProps} />
        </Funnel.Step>

        <Funnel.Step name="adminName">
          <SetNicknameStep moveToNextStep={moveToNextStep} {...nicknameProps} />
        </Funnel.Step>

        <Funnel.Step name="eventPassword">
          <SetEventPasswordStep
            moveToNextStep={moveToNextStep}
            nickname={nicknameProps.nickname}
            eventName={eventNameProps.eventName}
            setEventToken={setEventToken}
          />
        </Funnel.Step>

        <Funnel.Step name="complete">
          <CompleteCreateEventStep eventToken={eventToken} />
        </Funnel.Step>
      </Funnel>
    </MainLayout>
  );
};

export default CreateGuestEventFunnel;
