import Image from '@components/Design/components/Image/Image';

import getImageUrl from '@utils/getImageUrl';

import {logoStyle} from './Logo.style';

const StandingDogLogo = () => {
  return (
    <div css={logoStyle}>
      <Image src={getImageUrl('standingDog', 'webp')} fallbackSrc={getImageUrl('standingDog', 'png')} />
    </div>
  );
};

export default StandingDogLogo;
