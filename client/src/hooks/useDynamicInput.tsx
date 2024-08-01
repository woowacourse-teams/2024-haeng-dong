import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

const useDynamicInput = (validateFunc: (name: string) => ValidateResult) => {
  const [inputs, setInputs] = useState<string[]>(['']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // TODO: (@soha) 입력이 완료되고 중간에 값을 모두 지웠을 경우 Input이 없애지도록 수정하기
  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const validation = validateFunc(value);

    if (validation.isValid || value.length === 0) {
      setInputs(prevInputs => {
        const newInputs = [...prevInputs];
        newInputs[index] = event.target.value;
        return newInputs;
      });
      setErrorMessage('');
    } else {
      event.target.value = inputs[index];
      setErrorMessage(validation.errorMessage ?? '');
    }
  };

  const handleInputBlur = (index: number) => {
    const filterEmpty = inputs.filter(input => input.trim() !== '');

    if (filterEmpty.length !== inputs.length) {
      setInputs(prev => {
        const removeEmpty = prev.filter(value => value.trim() !== '');
        return [...removeEmpty, ''];
      });
    }
    if (inputs[index].trim() !== '' && index === inputs.length - 1) {
      setInputs(prev => {
        const newInputs = [...prev, ''];
        newInputs[index] = inputs[index];
        return newInputs;
      });
    }
  };

  const getNonEmptyInputs = () => {
    return inputs.filter(input => input.trim() !== '');
  };

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      const lastInput = inputRefs.current[inputRefs.current.length - 1];
      if (lastInput) {
        lastInput.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    }
  }, [inputs]);

  return {
    inputs,
    inputRefs,
    handleInputChange,
    handleInputBlur,
    errorMessage,
    getNonEmptyInputs,
  };
};

export default useDynamicInput;
