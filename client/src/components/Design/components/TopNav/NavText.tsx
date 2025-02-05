import {Location, useLocation} from 'react-router-dom';

import useNavItem from '@hooks/useNavItem';

import TextButton from '../TextButton/TextButton';
import {TextButtonProps} from '../TextButton/TextButton.type';

import NavItem from './NavItem';
import {NavItemProps} from './NavItem.type';

const getTextColor = (isMatchPath: boolean, isEmphasis?: boolean) => {
  if (isEmphasis === undefined) {
    return isMatchPath ? 'onTertiary' : 'gray';
  }

  return isEmphasis ? 'onTertiary' : 'gray';
};

type NavTextProps = Omit<NavItemProps, 'children'> &
  Partial<TextButtonProps> & {
    isEmphasis?: boolean;

    children: string;
    onClick?: () => void;
  };

/**
 * onClick를 넘겨주었으면 routePath는 무시됩니다.
 */
const NavText = ({isEmphasis, children, routePath = '', onClick, ...textButtonProps}: NavTextProps) => {
  const {isPathMatch, handleClick} = useNavItem({onClick, routePath});

  return (
    <NavItem>
      <TextButton
        {...textButtonProps}
        onClick={handleClick}
        textColor={getTextColor(isPathMatch, isEmphasis)}
        textSize={textButtonProps.textSize ?? 'bodyBold'}
      >
        {children}
      </TextButton>
    </NavItem>
  );
};

export default NavText;
