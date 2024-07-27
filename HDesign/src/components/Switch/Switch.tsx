/** @jsxImportSource @emotion/react */
import TextButton from '../TextButton/TextButton';

import {switchContainerStyle} from './Switch.style';
import {SwitchProps} from './Switch.type';
import {useSwitch} from './useSwitch';

function Switch({value = '', initialValue, values, onChange}: SwitchProps) {
  const {selectedValue, handleClick} = useSwitch({value, initialValue, values, onChange});

  return (
    <div css={switchContainerStyle}>
      {values.map((value, index) => (
        <TextButton
          key={`${index}_${value}`}
          textColor={selectedValue === value ? 'black' : 'gray'}
          textSize="bodyBold"
          onClick={() => handleClick(index)}
        >
          {value}
        </TextButton>
      ))}
    </div>
  );
}

export default Switch;
