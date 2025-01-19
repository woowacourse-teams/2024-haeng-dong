import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

import useFunnel from '@hooks/useFunnel';

import {MainLayout, TopNav} from '@components/Design';

import CompleteCreateEventStep from '../CompleteCreateEventStep';

import SetMemberEventNameStep from './SetUserEventNameStep';

type CreateUserEventStep = 'eventName' | 'complete';
const STEP_SEQUENCE: CreateUserEventStep[] = ['eventName', 'complete'];

const CreateUserEventFunnel = () => {
  const navigate = useNavigate();
  const [eventToken, setEventToken] = useState('');

  const {moveToNextStep, moveToPrevStep, Funnel, step} = useFunnel({
    defaultStep: 'eventName',
    stepList: STEP_SEQUENCE,
  });

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
          <SetMemberEventNameStep moveToNextStep={moveToNextStep} setEventToken={setEventToken} />
        </Funnel.Step>

        <Funnel.Step name="complete">
          <CompleteCreateEventStep eventToken={eventToken} />
        </Funnel.Step>
      </Funnel>
    </MainLayout>
  );
};

export default CreateUserEventFunnel;
