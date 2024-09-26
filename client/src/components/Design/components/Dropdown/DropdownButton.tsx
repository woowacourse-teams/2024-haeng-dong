/** @jsxImportSource @emotion/react */

import useTheme from '@components/Design/theme/useTheme';

import Text from '../Text/Text';

import {dropdownButtonStyle} from './Dropdown.style';
import {DropdownButtonProps} from './Dropdown.type';

const DropdownButton = ({text, ...buttonProps}: DropdownButtonProps) => {
  const {theme} = useTheme();
  return (
    <button css={dropdownButtonStyle(theme)} {...buttonProps}>
      <Text size="body" color="black">
        {text}
      </Text>
    </button>
  );
};

export default DropdownButton;
