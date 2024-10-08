/** @jsxImportSource @emotion/react */
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Flex from '../Flex/Flex';
import ClickOutsideDetector from '../ClickOutsideDetector';

import useDropdown from './useDropdown';
import {DropdownProps} from './Dropdown.type';
import DropdownButton from './DropdownButton';
import {dropdownStyle} from './Dropdown.style';

const Dropdown = ({base, children}: DropdownProps) => {
  const {isOpen, setIsOpen, meetBallsRef, dropdownRef} = useDropdown();
  const isDropdownOpen = isOpen && meetBallsRef.current;

  return (
    <ClickOutsideDetector targetRef={meetBallsRef} onClickOutside={() => setIsOpen(false)}>
      <IconButton
        ref={meetBallsRef}
        variants="none"
        onClick={() => setIsOpen(true)}
        style={{position: 'relative', WebkitTapHighlightColor: 'transparent'}}
      >
        <Icon iconType="meatballs" />
        {isDropdownOpen && (
          <ClickOutsideDetector targetRef={dropdownRef} onClickOutside={() => setIsOpen(false)}>
            <section ref={dropdownRef}>
              <Flex {...dropdownStyle}>
                {children.map(button => (
                  <DropdownButton {...button.props} />
                ))}
              </Flex>
            </section>
          </ClickOutsideDetector>
        )}
      </IconButton>
    </ClickOutsideDetector>
  );
};

export default Dropdown;
