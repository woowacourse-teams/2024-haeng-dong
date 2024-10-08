/** @jsxImportSource @emotion/react */
import Button from '../Button/Button';
import Flex from '../Flex/Flex';

import {dropdownButtonBaseStyle, dropdownStyle} from './Dropdown.style';
import {DropdownProps} from './Dropdown.type';
import DropdownButton from './DropdownButton';

type ButtonBaseProps = DropdownProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLElement>;
};

const ButtonBase = ({isOpen, setIsOpen, dropdownRef, baseButtonText, children}: ButtonBaseProps) => {
  return (
    <>
      <Button variants="tertiary" size="small" onClick={() => setIsOpen(true)}>
        {baseButtonText}
      </Button>
      {isOpen && (
        <section ref={dropdownRef}>
          <Flex {...dropdownButtonBaseStyle}>
            {children.map((button, index) => (
              <DropdownButton key={index} {...button.props} />
            ))}
          </Flex>
        </section>
      )}
    </>
  );
};

export default ButtonBase;
