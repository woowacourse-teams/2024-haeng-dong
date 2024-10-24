import Image from '@components/Design/components/Image/Image';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {avatarImageStyle, avatarStyle} from './Avatar.style';

interface Props {
  imagePath: string;
  name: string;
  navigateUrl: string;
}

const Avatar = ({imagePath, name, navigateUrl}: Props) => {
  return (
    <a href={navigateUrl} target="_blank" css={avatarStyle}>
      <Image
        src={getImageUrl(imagePath, 'webp')}
        fallbackSrc={getImageUrl(imagePath, 'png')}
        loading="lazy"
        css={avatarImageStyle}
      />
      <Text size="bodyBold" textColor="white" responsive={true}>
        {name}
      </Text>
    </a>
  );
};

export default Avatar;
