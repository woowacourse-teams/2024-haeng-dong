import StandingDog from '@assets/image/standingDog.svg';

import {logoStyle} from './Logo.style';

const StandingDogLogo = () => {
  return (
    <div css={logoStyle}>
      <StandingDog />
    </div>
  );
};

export default StandingDogLogo;
