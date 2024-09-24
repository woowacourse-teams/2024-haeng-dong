import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import validateEventPassword from '@utils/validate/validateEventPassword';

import RULE from '@constants/rule';

import useRequestPostEvent from './queries/event/useRequestPostEvent';

export type UseSetEventPasswordStepReturnType = ReturnType<typeof useSetEventPasswordStep>;

const useSetEventPasswordStep = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const {postEvent: requestPostEvent, isPostEventPending} = useRequestPostEvent();

  const submitDataForPostEvent = async ({
    event,
    eventName,
    setEventToken,
  }: {
    event: React.FormEvent<HTMLFormElement>;
    eventName: string;
    setEventToken: (eventToken: string) => void;
  }) => {
    event.preventDefault();

    await postEvent(eventName, setEventToken);
  };

  const getPasswordWithPad = () => {
    return String(password).padStart(4, '0');
  };

  const postEvent = async (eventName: string, updateEventToken: (eventToken: string) => void) => {
    await requestPostEvent(
      {eventName, password: getPasswordWithPad()},
      {
        onSuccess: ({eventId}) => {
          updateEventToken(eventId);
        },
      },
    );
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
