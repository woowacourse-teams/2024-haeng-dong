/** @jsxImportSource @emotion/react */

import Text from '../Text/Text';

import {dropdownButtonStyle} from './Dropdown.style';
import {DropdownButtonProps} from './Dropdown.type';

const DropdownButton = ({text, ...buttonProps}: DropdownButtonProps) => {
  return (
    <button css={dropdownButtonStyle} {...buttonProps}>
      <Text size="body" color="black">
        {text}
      </Text>
    </button>
  );
};

export default DropdownButton;
