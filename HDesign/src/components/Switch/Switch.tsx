/** @jsxImportSource @emotion/react */
import TextButton from '../TextButton/TextButton';
import {switchContainerStyle} from './Switch.style';
import {SwitchProps} from './Switch.type';
import {useSwitch} from './useSwitch';

const Switch = ({value, values, onChange}: SwitchProps) => {
  const {selectedValue, handleClick} = useSwitch({value, values, onChange});

  return (
    <div css={switchContainerStyle}>
      {values.map((item, index) => (
        <TextButton
          key={`${index}_${item}`}
          textColor={selectedValue === item ? 'black' : 'gray'}
          textSize="bodyBold"
          onClick={() => handleClick(index)}
        >
          {item}
        </TextButton>
      ))}
    </div>
  );
};

export default Switch;
