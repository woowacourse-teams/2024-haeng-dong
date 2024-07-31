// interface UseInputProps<T> {

// }

// const useInput = <T>({}) => {
//   const [value, setValue] = useState();
//   const handleChange = (index: number, value: string) => {
//     const newInputs = [...inputs];
//     newInputs[index] = value;
//     setInputs(newInputs);
//   };

//   const handleBlur = (index: number) => {
//     if (inputs[index].trim() === '') {
//       setInputs(prev => {
//         const newInputs = [...prev];
//         newInputs[index] = '';
//         return newInputs;
//       });
//     } else if (inputs[index].trim() !== '' && index === inputs.length - 1) {
//       setInputs(prev => {
//         const newInputs = [...prev, ''];
//         newInputs[index] = inputs[index].trim();
//         return newInputs;
//       });
//     }
//   };

//   const getNonEmptyInputs = () => {
//     return inputs.filter(input => input.trim() !== '');
//   };
// }
