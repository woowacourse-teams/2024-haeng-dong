import {ReactNode} from 'react';

import {topNavStyle, topNavWrapperStyle} from './TopNav.style';
import NavText from './NavText';
import NavIcon from './NavIcon';

type TopNavProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const TopNav = ({left, right}: TopNavProps) => {
  return (
    <nav style={{margin: '0 1rem'}}>
      <ul css={topNavStyle}>
        <div css={topNavWrapperStyle}>{left}</div>
        <div css={topNavWrapperStyle}>{right}</div>
      </ul>
    </nav>
  );
};

/**
 * onClick를 넘겨주었으면 routePath는 무시됩니다.
 */
TopNav.Text = NavText;

/**
 * onClick를 넘겨주었으면 routePath는 무시됩니다.
 */
TopNav.Icon = NavIcon;

export default TopNav;
