import {useState} from 'react';

import validateEventPassword from '@utils/validate/validateEventPassword';

import RULE from '@constants/rule';

import useRequestPostLogin from './queries/auth/useRequestPostLogin';

const useEventLogin = () => {
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const {postLogin} = useRequestPostLogin();

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postLogin({password: String(password).padStart(4, '0')}, {onError: () => setErrorMessage('비밀번호가 틀렸어요')});
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
