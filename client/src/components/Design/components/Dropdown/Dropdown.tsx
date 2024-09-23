/** @jsxImportSource @emotion/react */
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Flex from '../Flex/Flex';

import useDropdown from './useDropdown';
import {DropdownProps} from './Dropdown.type';
import DropdownButton from './DropdownButton';
import {dropdownStyle} from './Dropdown.style';

const Dropdown = ({children}: DropdownProps) => {
  const {isOpen, openDropdown, meetBallsRef, dropdownRef} = useDropdown();
  const isDropdownOpen = isOpen && meetBallsRef.current;

  return (
    <IconButton ref={meetBallsRef} variants="none" onClick={openDropdown} style={{position: 'relative'}}>
      <Icon iconType="meatballs" />
      {isDropdownOpen && (
        <section ref={dropdownRef}>
          <Flex {...dropdownStyle}>
            {children.map(button => (
              <DropdownButton {...button.props} />
            ))}
          </Flex>
        </section>
      )}
    </IconButton>
  );
};

export default Dropdown;
