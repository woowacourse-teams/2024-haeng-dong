import {Text} from '@components/Design';

import {avatarImageStyle, avatarStyle} from './Avatar.style';
import Image from '@components/Design/components/Image/Image';

import getImageUrl from '@utils/getImageUrl';

interface Props {
  imagePath: string;
  name: string;
  navigateUrl: string;
}

const Avatar = ({imagePath, name, navigateUrl}: Props) => {
  return (
    <a href={navigateUrl} target="_blank" css={avatarStyle}>
      <Image src={getImageUrl(imagePath, 'webp')} fallbackSrc={getImageUrl(imagePath, 'png')} css={avatarImageStyle} />
      <Text size="bodyBold" textColor="white" responsive={true}>
        {name}
      </Text>
    </a>
  );
};

export default Avatar;
