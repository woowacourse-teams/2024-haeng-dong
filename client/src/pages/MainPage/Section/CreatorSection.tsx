import {css} from '@emotion/react';

import Text from '@components/Design/components/Text/Text';

const CreatorSection = () => {
  return (
    <div
      css={css({
        display: 'flex',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000 ',
      })}
    >
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '0 4rem',
          gap: '2rem',
          maxWidth: '1200px',
          '@media (max-width: 1024px)': {
            flexDirection: 'column-reverse',
          },
          '@media (min-width: 1200px)': {
            padding: '0',
          },
        })}
      >
        <div
          css={css({
            display: 'flex',
            width: 'max-content',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          })}
        >
          <img
            src={`${process.env.IMAGE_URL}/feature1.svg`}
            css={css({
              minWidth: '15rem',
              maxWidth: '25rem',
              width: '100%',
              '@media (min-width: 1024px)': {
                minWidth: '20rem',
                maxWidth: '25rem',
                width: '100%',
              },
              '@media (min-width: 1600px)': {
                minWidth: '25rem',
                maxWidth: '30rem',
                width: '100%',
              },
            })}
          />
          <Text size="subTitle" responsive={true}>
            누구와도 간편하게 정산하세요
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CreatorSection;
