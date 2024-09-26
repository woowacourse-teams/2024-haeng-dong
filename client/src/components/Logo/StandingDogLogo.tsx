import {logoStyle} from './Logo.style';

const StandingDogLogo = () => {
  return (
    <div css={logoStyle}>
      <img src={`${process.env.IMAGE_URL}/standingDog.svg`} />
    </div>
  );
};

export default StandingDogLogo;
