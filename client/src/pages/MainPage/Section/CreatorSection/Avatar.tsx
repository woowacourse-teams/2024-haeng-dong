import {css} from '@emotion/react';

import {Text} from '@components/Design';

interface Props {
  imagePath: string;
  name: string;
  onClick: () => void;
}

const Avatar = ({imagePath, name, onClick}: Props) => {
  return (
    <button
      onClick={onClick}
      css={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        '@media (min-width: 1200px)': {
          gap: '1rem',
        },
      })}
    >
      <img
        src={`${process.env.IMAGE_URL}/${imagePath}.png`}
        css={css({
          width: '100%',
          height: '100%',
          borderRadius: '25%',
        })}
      />
      <Text size="bodyBold" textColor="white" responsive={true}>
        {name}
      </Text>
    </button>
  );
};

export default Avatar;
