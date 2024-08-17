import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import validateEventName from '@utils/validate/validateEventName';

import {ROUTER_URLS} from '@constants/routerUrls';

const useSetEventNamePage = () => {
  const [eventName, setEventName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  const submitEventName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(ROUTER_URLS.eventCreatePassword, {state: {eventName}});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventName(newValue);

    setCanSubmit(newValue.length !== 0);

    if (validation.isValid) {
      setEventName(newValue);
      setErrorMessage('');
    } else {
      event.target.value = eventName;
      setErrorMessage(validation.errorMessage ?? '');
    }
  };

  return {submitEventName, errorMessage, eventName, canSubmit, handleChange};
};
export default useSetEventNamePage;
