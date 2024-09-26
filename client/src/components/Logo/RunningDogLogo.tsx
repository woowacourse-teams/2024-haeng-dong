import {logoStyle} from './Logo.style';

const RunningDogLogo = () => {
  return (
    <div css={logoStyle}>
      <img src={`${process.env.IMAGE_URL}/runningDog.svg`} />
    </div>
  );
};

export default RunningDogLogo;
