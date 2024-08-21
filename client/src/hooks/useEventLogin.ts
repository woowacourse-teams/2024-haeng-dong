import {useState} from 'react';

import validateEventPassword from '@utils/validate/validateEventPassword';

import RULE from '@constants/rule';

import useRequestPostLogin from './queries/useRequestPostLogin';

const useEventLogin = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const {mutate: postLogin} = useRequestPostLogin();

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postLogin({password}, {onError: () => setErrorMessage('비밀번호가 틀렸어요')});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventPassword(newValue);
    setErrorMessage(validation.errorMessage);

    if (validation.isValid) {
      setPassword(newValue);
    }

    setCanSubmit(newValue.length === RULE.maxEventPasswordLength);
  };

  return {
    password,
    errorMessage,
    handleChange,
    canSubmit,
    submitPassword,
  };
};

export default useEventLogin;
