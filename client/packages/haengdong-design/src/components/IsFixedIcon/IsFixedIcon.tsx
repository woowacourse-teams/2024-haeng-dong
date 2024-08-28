/** @jsxImportSource @emotion/react */

import {useTheme} from '@theme/HDesignProvider';

import {isFixedIconStyle} from './IsFixedIcon.style';

const IsFixedIcon = () => {
  const {theme} = useTheme();

  return <div css={isFixedIconStyle({theme})}>*</div>;
};

export default IsFixedIcon;
