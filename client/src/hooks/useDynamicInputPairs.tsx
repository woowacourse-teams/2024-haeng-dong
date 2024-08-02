import type {Bill} from 'types/serviceType';

import {useEffect, useRef, useState} from 'react';

const useDynamicInputPairs = () => {
  const [inputPairs, setInputPairs] = useState<Bill[]>([{title: '', price: 0}]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, field: 'title' | 'price', value: string) => {
    const newInputPairs = [...inputPairs];
    newInputPairs[index] = {
      ...newInputPairs[index],
      [field]: field === 'price' ? parseFloat(value) : value,
    };
    setInputPairs(newInputPairs);
  };

  const handleInputBlur = (index: number) => {
    const currentPair = inputPairs[index];
    if (currentPair.title.trim() === '' && currentPair.price === 0) {
      setInputPairs(prev => prev.filter((_, i) => i !== index));
    } else if (currentPair.title.trim() !== '' && currentPair.price !== 0 && index === inputPairs.length - 1) {
      setInputPairs(prev => [...prev, {title: '', price: 0}]);
    }
  };

  const getNonEmptyInputPairs = () => {
    return inputPairs.filter(currentPair => currentPair.title.trim() !== '' && currentPair.price !== 0);
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
  };
};

export default useDynamicInputPairs;
