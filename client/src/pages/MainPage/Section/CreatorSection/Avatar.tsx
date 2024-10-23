import {css} from '@emotion/react';

import {Text} from '@components/Design';
import {avatarImageStyle, avatarStyle} from './Avatar.style';

interface Props {
  imagePath: string;
  name: string;
  onClick: () => void;
}

const Avatar = ({imagePath, name, onClick}: Props) => {
  return (
    <button onClick={onClick} css={avatarStyle}>
      <img src={`${process.env.IMAGE_URL}/${imagePath}.png`} css={avatarImageStyle} />
      <Text size="bodyBold" textColor="white" responsive={true}>
        {name}
      </Text>
    </button>
  );
};

export default Avatar;
