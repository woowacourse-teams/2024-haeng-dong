/** @jsxImportSource @emotion/react */
import React from 'react';
import {topNavNonStyle, topNavStyle} from './TopNav.style';
import Back from './Back';
import Switch from '@components/Switch/Switch';

const TopNav: React.FC<React.PropsWithChildren> = ({children}) => {
  const hasBack = React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === Back);
  const hasSwitch = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === Switch,
  );

  const isExistNav = hasBack || hasSwitch;

  return <div css={isExistNav ? topNavStyle : topNavNonStyle}>{children}</div>;
};

export default TopNav;
