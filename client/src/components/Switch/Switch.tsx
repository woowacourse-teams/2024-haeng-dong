/** @jsxImportSource @emotion/react */
import TextButton from '../Design/components/TextButton/TextButton';

import {switchContainerStyle} from './Switch.style';
import {SwitchProps} from './Switch.type';

function Switch({value, values, onChange}: SwitchProps) {
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
}

export default Switch;
