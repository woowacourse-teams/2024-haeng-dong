/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Button from '../Button/Button';
import Flex from '../Flex/Flex';

import {dropdownButtonBaseStyle} from './Dropdown.style';
import {DropdownProps} from './Dropdown.type';
import DropdownButton from './DropdownButton';

type ButtonBaseProps = DropdownProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLElement>;
  onBaseButtonClick?: () => void;
};

const ButtonBase = ({isOpen, setIsOpen, dropdownRef, baseButtonText, onBaseButtonClick, children}: ButtonBaseProps) => {
  const {theme} = useTheme();

  const onClick = () => {
    if (onBaseButtonClick) onBaseButtonClick();
    setIsOpen(true);
  };

  return (
    <>
      <Button variants="tertiary" size="small" onClick={onClick}>
        {baseButtonText}
      </Button>
      {isOpen && (
        <section ref={dropdownRef}>
          <Flex {...dropdownButtonBaseStyle(theme)}>
            {children.map((button, index) => (
              <DropdownButton key={index} setIsOpen={setIsOpen} {...button.props} />
            ))}
          </Flex>
        </section>
      )}
    </>
  );
};

export default ButtonBase;
