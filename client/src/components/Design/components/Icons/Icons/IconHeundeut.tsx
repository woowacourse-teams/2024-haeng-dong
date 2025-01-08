import getImageUrl from '@utils/getImageUrl';

import Image from '../../Image/Image';

export const IconHeundeut = () => {
  return (
    <Image src={getImageUrl('heundeut', 'webp')} fallbackSrc={getImageUrl('heundeut', 'svg')} style={{width: '3rem'}} />
  );
};
