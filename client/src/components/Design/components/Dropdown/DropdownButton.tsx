/** @jsxImportSource @emotion/react */

import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';

import {dropdownButtonStyle} from './Dropdown.style';
import {DropdownButtonProps} from './Dropdown.type';

const DropdownButton = ({text, onClick, ...buttonProps}: DropdownButtonProps) => {
  const {theme} = useTheme();

  return (
    <button
      css={dropdownButtonStyle(theme)}
      onClick={event => {
        event.stopPropagation();
        if (onClick) onClick(event);
      }}
      {...buttonProps}
    >
      <Text size="body" color="black">
        {text}
      </Text>
    </button>
  );
};

export default DropdownButton;
