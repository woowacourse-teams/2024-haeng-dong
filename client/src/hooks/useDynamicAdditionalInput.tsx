import {useEffect, useRef, useState} from 'react';

const useDynamicInput = () => {
  const [inputs, setInputs] = useState<string[]>(['']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // TODO: (@soha) 입력이 완료되고 중간에 값을 모두 지웠을 경우 Input이 없애지도록 수정하기
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleInputBlur = (index: number) => {
    if (inputs[index].trim() === '') {
      setInputs(prev => {
        const newInputs = [...prev];
        newInputs[index] = '';
        return newInputs;
      });
    } else if (inputs[index].trim() !== '' && index === inputs.length - 1) {
      setInputs(prev => {
        const newInputs = [...prev, ''];
        newInputs[index] = inputs[index].trim();
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
    getNonEmptyInputs,
  };
};

export default useDynamicInput;
