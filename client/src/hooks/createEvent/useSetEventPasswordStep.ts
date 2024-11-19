import {useState} from 'react';

import validateEventPassword from '@utils/validate/validateEventPassword';
import {CreateEventArgs, EventName} from 'types/createEvent';

import RULE from '@constants/rule';

import useRequestPostGuestEvent from '../queries/event/useRequestPostGuestEvent';
import useAmplitude from '../useAmplitude';

export type UseSetEventPasswordStepReturnType = ReturnType<typeof useSetEventPasswordStep>;

type SubmitDataForPostEventArgs = Omit<CreateEventArgs, 'password'> & {
  event: React.FormEvent<HTMLFormElement>;
  setEventToken: (eventToken: string) => void;
};

const useSetEventPasswordStep = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const {postEvent: requestPostEvent, isPostEventPending} = useRequestPostGuestEvent();

  const {trackCompleteCreateEvent} = useAmplitude();

  const submitDataForPostEvent = async ({event, nickname, eventName, setEventToken}: SubmitDataForPostEventArgs) => {
    event.preventDefault();

    await requestPostEvent(
      {eventName, nickname, password: getPasswordWithPad()},
      {
        onSuccess: ({eventId}) => {
          trackCompleteCreateEvent({eventName, eventToken: eventId});
          setEventToken(eventId);
        },
      },
    );
  };

  const getPasswordWithPad = () => {
    return String(password).padStart(4, '0');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventPassword(newValue);

    setCanSubmit(newValue.length === RULE.maxEventPasswordLength);

    if (validation.isValid) {
      setPassword(newValue);
      setErrorMessage('');
    } else {
      event.target.value = password;
      setErrorMessage(validation.errorMessage ?? '');
    }
  };

  return {
    submitDataForPostEvent,
    errorMessage,
    handleChange,
    canSubmit,
    isPostEventPending,
    password,
  };
};

export default useSetEventPasswordStep;
