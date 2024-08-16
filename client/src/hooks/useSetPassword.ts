import {useState} from 'react';

import validateEventPassword from '@utils/validate/validateEventPassword';

import RULE from '@constants/rule';

import {useFetch} from './useFetch/useFetch';
import useEvent from './useEvent/useEvent';

const useSetPassword = (eventName: string) => {
  const {fetch} = useFetch();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const {createNewEvent} = useEvent();

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {eventId} = await fetch({queryFunction: () => createNewEvent({eventName, password: parseInt(password)})});
    return eventId;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const {isValid, errorMessage} = validateEventPassword(newValue);

    setCanSubmit(newValue.length === RULE.maxEventPasswordLength);

    if (isValid) {
      setPassword(newValue);
      setErrorMessage('');
    } else {
      event.target.value = password;
      setErrorMessage(errorMessage ?? '');
    }
  };

  return {
    password,
    errorMessage,
    canSubmit,
    submitPassword,
    handlePasswordChange,
  };
};

export default useSetPassword;
