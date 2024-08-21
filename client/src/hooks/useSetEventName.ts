import {useState} from 'react';

import validateEventName from '@utils/validate/validateEventName';

const useSetEventName = () => {
  const [eventName, setEventName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventName(newValue);

    setCanSubmit(newValue.length !== 0);
    setErrorMessage(validation.errorMessage);

    if (validation.isValid) {
      setEventName(newValue);
    } else {
      event.target.value = eventName;
    }
  };

  return {
    eventName,
    errorMessage,
    canSubmit,
    handleEventNameChange,
  };
};

export default useSetEventName;
