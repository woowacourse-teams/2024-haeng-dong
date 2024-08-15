import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import validateEventPassword from '@utils/validate/validateEventPassword';

import {useFetch} from '@apis/useFetch';

import {ROUTER_URLS} from '@constants/routerUrls';
import RULE from '@constants/rule';

import useEvent from './useEvent';

const useSetPassword = (eventName: string) => {
  const {fetch} = useFetch();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const {createNewEvent} = useEvent();
  const navigate = useNavigate();

  const createEventAndNavigate = async () => {
    const {eventId} = await createNewEvent({eventName, password: parseInt(password)});

    navigate(`${ROUTER_URLS.eventCreateComplete}?${new URLSearchParams({eventId})}`);
  };

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch({queryFunction: createEventAndNavigate});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    handleChange,
  };
};

export default useSetPassword;
