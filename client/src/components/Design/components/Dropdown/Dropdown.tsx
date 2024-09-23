/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Flex from '../Flex/Flex';

import useDropdown from './useDropdown';
import {DropdownProps} from './Dropdown.type';
import DropdownButton from './DropdownButton';
import {dropdownStyle} from './Dropdown.style';

const Dropdown = ({children}: DropdownProps) => {
  const {isOpen, openDropdown, meetBallsRef, dropdownRef, dropdownComponentRef} = useDropdown();
  const isDropdownOpen = isOpen && meetBallsRef.current && dropdownComponentRef.current;

  return (
    <div ref={dropdownComponentRef}>
      <IconButton ref={meetBallsRef} variants="none" onClick={openDropdown}>
        <Icon iconType="meatballs" />
      </IconButton>
      {isDropdownOpen &&
        createPortal(
          <section ref={dropdownRef}>
            <Flex {...dropdownStyle}>
              {children.map(button => (
                <DropdownButton {...button.props} />
              ))}
            </Flex>
          </section>,
          dropdownComponentRef.current,
        )}
    </div>
  );
};

export default Dropdown;
