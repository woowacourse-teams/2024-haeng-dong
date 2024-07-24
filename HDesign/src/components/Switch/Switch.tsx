/** @jsxImportSource @emotion/react */
import TextButton from '../TextButton/TextButton';
import {switchContainerStyle} from './Switch.style';
import {SwitchProps} from './Switch.type';

const Switch = ({value, values, onChange}: SwitchProps) => {
  return (
    <div css={switchContainerStyle}>
      {values.map((item, index) => (
        <TextButton
          key={`${index}_${item}`}
          textColor={value === item ? 'black' : 'gray'}
          textSize="bodyBold"
          onClick={() => onChange(values[index])}
        >
          {item}
        </TextButton>
      ))}
    </div>
  );
};

export default Switch;
