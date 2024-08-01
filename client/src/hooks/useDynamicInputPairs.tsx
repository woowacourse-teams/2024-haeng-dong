import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

const useDynamicInputPairs = (validateFunc: (inputPair: Bill) => ValidateResult) => {
  const [inputPairs, setInputPairs] = useState<Bill[]>([{title: '', price: 0}]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const handleInputChange = (index: number, field: 'title' | 'price', event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const currentPair = inputPairs[index];
    const validation = validateFunc(currentPair);

    if (validation.isValid) {
      const newInputPairs = [...inputPairs];
      newInputPairs[index] = {
        ...newInputPairs[index],
        [field]: field === 'price' ? parseFloat(value) : value,
      };
      setInputPairs(newInputPairs);
      setErrorMessage('');
    } else {
      event.target.value = inputPairs[index][field].toString();
      setErrorMessage(validation.errorMessage ?? '');
    }

    if (inputPairs[index].price !== 0 && inputPairs[index].title.trim().length > 0 && inputPairs.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const handleInputBlur = (index: number) => {
    const currentPair = inputPairs[index];
    const filterEmpty = inputPairs.filter(pair => pair.title.trim() !== '' && pair.price !== 0);

    if (filterEmpty.length !== inputPairs.length) {
      setInputPairs(prev => prev.filter((_, i) => i !== index));
    }
    if (currentPair.title.trim() !== '' && currentPair.price !== 0 && index === inputPairs.length - 1) {
      setInputPairs(prev => [...prev, {title: '', price: 0}]);
    }
  };

  const getNonEmptyInputPairs = () => {
    return inputPairs.filter(pair => pair.title.trim() !== '' && pair.price !== 0);
  };

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      const lastInputPair = inputRefs.current.slice(-2);
      lastInputPair.forEach(ref => ref?.scrollIntoView({behavior: 'smooth', block: 'center'}));
    }
  }, [inputPairs]);

  return {
    inputPairs,
    getNonEmptyInputPairs,
    inputRefs,
    handleInputChange,
    handleInputBlur,
    errorMessage,
    canSubmit,
  };
};

export default useDynamicInputPairs;
