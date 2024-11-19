import {useState} from 'react';

import validateMemberName from '@utils/validate/validateMemberName';
import {NickName} from 'types/createEvent';

type UseSetNickNameStepProps = ReturnType<typeof useSetNicknameStep>;

const useSetNicknameStep = () => {
  const [nickName, setNickName] = useState<NickName>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const {isValid, errorMessage: errorMessageResult} = validateMemberName(name);

    setErrorMessage(errorMessageResult);

    if (isValid) {
      setNickName(name);
    }

    setCanSubmit(name.length !== 0);
  };

  return {handleNickNameChange, canSubmit, nickName, errorMessage};
};

export {useSetNicknameStep as useSetNickNameStep, type UseSetNickNameStepProps};
