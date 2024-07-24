import {useState} from 'react';

const useDynamicInput = () => {
  const [inputs, setInputs] = useState<string[]>(['']);

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

  return {
    inputs,
    handleInputChange,
    handleInputBlur,
    getNonEmptyInputs,
  };
};

export default useDynamicInput;
