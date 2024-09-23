import {useNavigate} from 'react-router-dom';

import useFunnel from '@hooks/useFunnel';
import useCreateEventData from '@hooks/useCreateEventData';

import {Back, MainLayout, TopNav} from '@components/Design';

import SetEventNameStep from './SetEventNameStep';
import SetEventPasswordStep from './SetEventPasswordStep';
import CompleteCreateEventPage from './CompleteCreateEventPage';

type CreateEventStep = 'eventName' | 'eventPassword' | 'complete';
const STEP_SEQUENCE: CreateEventStep[] = ['eventName', 'eventPassword', 'complete'];

const CreateEventFunnel = () => {
  const navigate = useNavigate();
  const {moveToNextStep, moveToPrevStep, Step, Funnel, step} = useFunnel({
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
      <TopNav>{step !== STEP_SEQUENCE[STEP_SEQUENCE.length - 1] && <Back onClick={handleBack} />}</TopNav>
      <Funnel>
        <Step name="eventName">
          <SetEventNameStep moveToNextStep={moveToNextStep} {...eventNameProps} />
        </Step>
        <Step name="eventPassword">
          <SetEventPasswordStep
            moveToNextStep={moveToNextStep}
            eventName={eventNameProps.eventName}
            setEventToken={setEventToken}
          />
        </Step>
        <Step name="complete">
          <CompleteCreateEventPage eventToken={eventToken} />
        </Step>
      </Funnel>
    </MainLayout>
  );
};

export default CreateEventFunnel;
