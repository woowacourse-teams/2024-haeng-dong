import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import validateEventPassword from '@utils/validate/validateEventPassword';

import {ROUTER_URLS} from '@constants/routerUrls';
import RULE from '@constants/rule';

import usePostEvent from './queries/useRequestPostEvent';

const useSetEventPasswordPage = () => {
  const [eventName, setEventName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {mutate: postEvent} = usePostEvent();

  useEffect(() => {
    if (!location.state) {
      navigate(ROUTER_URLS.main);
    } else {
      setEventName(location.state.eventName);
    }
  }, []);

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postEvent(
      {eventName, password: parseInt(password)},
      {
        onSuccess: data => {
          navigate(`${ROUTER_URLS.eventCreateComplete}?${new URLSearchParams({eventId: data.eventId})}`, {
            replace: true,
          });
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

  return {submitPassword, errorMessage, password, handleChange, canSubmit};
};
export default useSetEventPasswordPage;
