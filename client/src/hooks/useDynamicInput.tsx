import {useEffect, useRef, useState} from 'react';

import {ValidateResult} from '@utils/validate/type';

const useDynamicInput = (validateFunc: (name: string) => ValidateResult) => {
  const [inputs, setInputs] = useState<string[]>(['']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  // const [errorIds, setErrorIds] = useState<string>('');

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
      // setErrorIds(prevIds => prevIds.filter(errorId => errorId !== id));
    } else {
      event.target.value = inputs[index];
      setErrorMessage(validation.errorMessage ?? '');
      // setErrorIds(prevIds => [...new Set([...prevIds, id])]);
    }

    if (value.length > 0 && inputs.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const handleInputBlur = (index: number) => {
    // const newInputs = inputs.map((input, idx) => (idx === index ? input : ''));
    const filterEmpty = inputs.filter(input => input.trim() !== '');

    console.log(filterEmpty, '!!!!!!');

    setInputs([...filterEmpty, '']);

    // if (filterEmpty.length !== inputs.length) {
    //   setInputs(prev => {
    //     const notEmpty = prev.filter((input, index) => {
    //       if (index === prev.length - 1) return;
    //       return input.trim() !== '';
    //     });
    //     console.log(notEmpty, '@@@');
    //     console.log([...notEmpty, '']);
    //     return [...notEmpty, ''];
    //   });
    // }

    // if (!inputs.every(input => input !== '')) {
    //   setInputs(prev => prev.filter(input => input !== ''));
    // } else {
    //   setInputs(prev => {
    //     console.log(prev, 'ore~!~~~~~~');
    //     const newInputs = [...prev, ''];
    //     // newInputs[index] = inputs[index];
    //     return newInputs;
    //   });
    // }
    // console.log(inputs, '@@@@@@@@@');
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
    canSubmit,
  };
};

export default useDynamicInput;
