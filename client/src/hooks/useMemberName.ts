import {useState} from 'react';

import validateMemberName from '@utils/validate/validateMemberName';
import {Nickname} from 'types/serviceType';

const useMemberName = (defaultMemberName?: string) => {
  const [name, setName] = useState<Nickname>(defaultMemberName ?? '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const {memberName: memberNameResult, isValid, errorMessage: errorMessageResult} = validateMemberName(name);
    setErrorMessage(errorMessageResult);

    if (isValid || name.length === 0) {
      setName(memberNameResult);
      setCanSubmit(isValid);
    }
  };

  const clearMemberName = () => {
    setName('');
    setErrorMessage(null);
    setCanSubmit(false);
  };

  return {errorMessage, canSubmit, name, handleNameChange, clearMemberName};
};

export default useMemberName;
