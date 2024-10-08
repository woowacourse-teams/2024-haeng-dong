/** @jsxImportSource @emotion/react */
import ClickOutsideDetector from '../ClickOutsideDetector';
import Flex from '../Flex/Flex';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';

import {dropdownStyle} from './Dropdown.style';
import {DropdownProps} from './Dropdown.type';
import DropdownButton from './DropdownButton';

type MeatballBaseProps = DropdownProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLElement>;
};

const MeatballBase = ({isOpen, setIsOpen, dropdownRef, children}: MeatballBaseProps) => {
  return (
    <>
      <IconButton variants="none" onClick={() => setIsOpen(true)}>
        <Icon iconType="meatballs" />
      </IconButton>
      {isOpen && (
        <section ref={dropdownRef}>
          <Flex {...dropdownStyle}>
            {children.map((button, index) => (
              <DropdownButton key={index} {...button.props} />
            ))}
          </Flex>
        </section>
      )}
    </>
  );
};

export default MeatballBase;
