import {useState} from 'react';

import validateMemberName from '@utils/validate/validateMemberName';
import {NickName} from 'types/createEvent';

type UseSetNicknameStepProps = ReturnType<typeof useSetNicknameStep>;

const useSetNicknameStep = () => {
  const [nickname, setNickname] = useState<NickName>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const {isValid, errorMessage: errorMessageResult} = validateMemberName(name);

    setErrorMessage(errorMessageResult);

    if (isValid) {
      setNickname(name);
    }

    setCanSubmit(name.length !== 0);
  };

  return {handleNicknameChange, canSubmit, nickname, errorMessage};
};

export {useSetNicknameStep, type UseSetNicknameStepProps};
