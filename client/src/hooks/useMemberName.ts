import {useState} from 'react';

import validateMemberName from '@utils/validate/validateMemberName';
import {Nickname} from 'types/serviceType';

const useMemberName = (defaultNickname?: string) => {
  const [name, setName] = useState<Nickname>(defaultNickname ?? '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const {memberName: nicknameResult, isValid, errorMessage: errorMessageResult} = validateMemberName(name);
    setErrorMessage(errorMessageResult);

    if (isValid || name.length === 0) {
      setName(nicknameResult);
      setCanSubmit(isValid);
    }
  };

  const clearNickname = () => {
    setName('');
    setErrorMessage(null);
    setCanSubmit(false);
  };

  return {errorMessage, canSubmit, name, handleNameChange, clearNickname};
};

export default useMemberName;
