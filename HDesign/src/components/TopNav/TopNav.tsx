/** @jsxImportSource @emotion/react */
import React from 'react';
import {topNavNonStyle, topNavStyle} from './TopNav.style';
import {StrictPropsWithChildren} from '@/types/strictPropsWithChildren';
import {NavSwitch, Back} from './index';

const TopNav: React.FC<StrictPropsWithChildren> = ({children}) => {
  const hasBack = React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === Back);
  const hasNavSwitch = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === NavSwitch,
  );

  const isExistNav = hasBack || hasNavSwitch;

  return <div css={isExistNav ? topNavStyle : topNavNonStyle}>{children}</div>;
};

export default TopNav;
