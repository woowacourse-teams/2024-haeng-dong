/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';
import {IconCheck} from '../Icons/Icons/IconCheck';

import {checkboxStyle, inputGroupStyle} from './Checkbox.style';

interface Props {
  labelText: string;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox = ({labelText, isChecked = false, onChange}: Props) => {
  const {theme} = useTheme();
  return (
    <label css={checkboxStyle}>
      <div css={inputGroupStyle({theme, isChecked})}>
        {isChecked ? <IconCheck size={20} color="onPrimary" className="check-icon" /> : null}
        <input type="checkbox" checked={isChecked} onChange={onChange} className="checkbox-input" />
      </div>
      <Text size="bodyBold">{labelText}</Text>
    </label>
  );
};

export default Checkbox;
