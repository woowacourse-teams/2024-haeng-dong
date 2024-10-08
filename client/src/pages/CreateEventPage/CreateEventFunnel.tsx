import {useNavigate} from 'react-router-dom';

import useFunnel from '@hooks/useFunnel';
import useCreateEventData from '@hooks/useCreateEventData';

import {MainLayout, TopNav} from '@components/Design';

import SetEventNameStep from './SetEventNameStep';
import SetEventPasswordStep from './SetEventPasswordStep';
import CompleteCreateEventStep from './CompleteCreateEventStep';

type CreateEventStep = 'eventName' | 'eventPassword' | 'complete';
const STEP_SEQUENCE: CreateEventStep[] = ['eventName', 'eventPassword', 'complete'];

const CreateEventFunnel = () => {
  const navigate = useNavigate();
  const {moveToNextStep, moveToPrevStep, Funnel, step} = useFunnel({
    defaultStep: 'eventName',
    stepList: STEP_SEQUENCE,
  });

  const {eventNameProps, eventToken, setEventToken} = useCreateEventData();

  const handleBack = () => {
    if (step === STEP_SEQUENCE[0]) {
      navigate('/');
    } else {
      moveToPrevStep();
    }
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        {step !== STEP_SEQUENCE[STEP_SEQUENCE.length - 1] && (
          <TopNav.Item displayName="뒤로가기" noEmphasis routePath="" onHandleRouteInFunnel={handleBack} />
        )}
      </TopNav>
      <Funnel step={step}>
        <Funnel.Step name="eventName">
          <SetEventNameStep moveToNextStep={moveToNextStep} {...eventNameProps} />
        </Funnel.Step>

        <Funnel.Step name="eventPassword">
          <SetEventPasswordStep
            moveToNextStep={moveToNextStep}
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

export default CreateEventFunnel;
