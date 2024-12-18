/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

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
        {isChecked ? <Icon iconType="check" iconColor="onPrimary" className="check-icon" /> : null}
        <input type="checkbox" checked={isChecked} onChange={onChange} className="checkbox-input" />
      </div>
      <Text size="bodyBold">{labelText}</Text>
    </label>
  );
};

export default Checkbox;
