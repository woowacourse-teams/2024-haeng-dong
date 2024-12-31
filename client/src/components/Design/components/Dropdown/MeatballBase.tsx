/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Flex from '../Flex/Flex';
import Icon from '../Iconx/Icon';
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
  const {theme} = useTheme();

  return (
    <>
      <IconButton variants="none" onClick={() => setIsOpen(true)} aria-label="더보기">
        <Icon iconType="meatballs" />
      </IconButton>
      {isOpen && (
        <section ref={dropdownRef}>
          <Flex {...dropdownStyle(theme)}>
            {children.map((button, index) => (
              <DropdownButton key={index} setIsOpen={setIsOpen} {...button.props} />
            ))}
          </Flex>
        </section>
      )}
    </>
  );
};

export default MeatballBase;
