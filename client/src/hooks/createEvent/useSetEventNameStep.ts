import {useState} from 'react';

import validateEventName from '@utils/validate/validateEventName';

export type UseSetEventNameStepReturnType = ReturnType<typeof useSetEventNameStep>;

const useSetEventNameStep = (initialEventName?: string) => {
  const [eventName, setEventName] = useState(initialEventName ?? '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventName(newValue);

    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
    } else {
      setErrorMessage('');
      setEventName(newValue);
    }
    setCanSubmit(newValue.length !== 0);
  };

  return {
    eventName,
    errorMessage,
    canSubmit,
    handleEventNameChange,
  };
};

export default useSetEventNameStep;
