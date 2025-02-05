import Image from '@components/Design/components/Image/Image';

import getImageUrl from '@utils/getImageUrl';

import {logoStyle, logoImageStyle} from './Logo.style';

const StandingDogLogo = () => {
  return (
    <div css={logoStyle}>
      <Image
        src={getImageUrl('standingDog', 'webp')}
        fallbackSrc={getImageUrl('standingDog', 'png')}
        css={logoImageStyle}
      />
    </div>
  );
};

export default StandingDogLogo;
