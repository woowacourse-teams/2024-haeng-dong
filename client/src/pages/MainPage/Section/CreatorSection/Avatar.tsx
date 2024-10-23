import {Text} from '@components/Design';

import {avatarImageStyle, avatarStyle} from './Avatar.style';

interface Props {
  imagePath: string;
  name: string;
  navigateUrl: string;
}

const Avatar = ({imagePath, name, navigateUrl}: Props) => {
  return (
    <a href={navigateUrl} target="_blank" css={avatarStyle}>
      <img src={`${process.env.IMAGE_URL}/${imagePath}.png`} css={avatarImageStyle} />
      <Text size="bodyBold" textColor="white" responsive={true}>
        {name}
      </Text>
    </a>
  );
};

export default Avatar;
