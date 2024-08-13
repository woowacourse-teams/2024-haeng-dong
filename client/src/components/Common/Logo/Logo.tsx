import Dog from '@assets/image/dog.svg';

import {logoStyle} from './Logo.style';

const Logo = () => {
  return (
    <div css={logoStyle}>
      <Dog />
    </div>
  );
};

export default Logo;
