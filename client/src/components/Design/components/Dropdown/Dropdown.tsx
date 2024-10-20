/** @jsxImportSource @emotion/react */
import ClickOutsideDetector from '../ClickOutsideDetector';

import useDropdown from './useDropdown';
import {DropdownProps} from './Dropdown.type';
import MeatballBase from './MeatballBase';
import ButtonBase from './ButtonBase';
import {dropdownBaseStyle} from './Dropdown.style';

const Dropdown = ({base = 'meatballs', baseButtonText, onBaseButtonClick, children}: DropdownProps) => {
  const {isOpen, setIsOpen, baseRef, dropdownRef} = useDropdown();
  const isDropdownOpen = isOpen && !!baseRef.current;

  return (
    <ClickOutsideDetector targetRef={baseRef} onClickOutside={() => setIsOpen(false)}>
      <div ref={baseRef} css={dropdownBaseStyle}>
        {base === 'meatballs' && (
          <MeatballBase isOpen={isDropdownOpen} setIsOpen={setIsOpen} dropdownRef={dropdownRef} children={children} />
        )}
        {base === 'button' && (
          <ButtonBase
            isOpen={isDropdownOpen}
            setIsOpen={setIsOpen}
            onBaseButtonClick={onBaseButtonClick}
            dropdownRef={dropdownRef}
            children={children}
            baseButtonText={baseButtonText}
          />
        )}
      </div>
    </ClickOutsideDetector>
  );
};

export default Dropdown;
