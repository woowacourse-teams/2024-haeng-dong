import Image from '@components/Design/components/Image/Image';

import getImageUrl from '@utils/getImageUrl';

import {logoStyle} from './Logo.style';

const RunningDogLogo = () => {
  return (
    <div css={logoStyle}>
      <Image width="100%" src={getImageUrl('runningDog', 'webp')} fallbackSrc={getImageUrl('runningDog', 'png')} />
    </div>
  );
};

export default RunningDogLogo;
