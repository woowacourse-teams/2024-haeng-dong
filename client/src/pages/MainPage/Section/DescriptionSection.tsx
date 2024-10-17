import {css} from '@emotion/react';

import {useTheme} from '@components/Design/theme/HDesignProvider';
import Text from '@HDesign/components/Text/Text';

const DescriptionSection = () => {
  const {theme} = useTheme();

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        gap: '1.5rem',
        padding: '3rem 1.5rem',
        backgroundColor: 'white',
      })}
    >
      <img
        css={css({
          width: '10rem',
          '@media (min-width: 768px)': {
            minWidth: '10rem',
            maxWidth: '15rem',
            width: '100%',
          },
          '@media (min-width: 1600px)': {
            minWidth: '15rem',
            maxWidth: '20rem',
            width: '100%',
          },
        })}
        src={`${process.env.IMAGE_URL}/standingDog.svg`}
      />

      <Text style={{textAlign: 'center'}} size="subTitle" responsive={true}>{`행동대장들을 위해
        행동대장을 준비했어요
          `}</Text>
      <Text style={{textAlign: 'center'}} size="subTitle" responsive={true} textColor="gray">{`주환이가 먼저 집에 가도
        소연이가 늦게 도착해도
        건상이가 술을 마시지 않아도
          `}</Text>
      <Text style={{textAlign: 'center'}} size="subTitle" responsive={true}>{`간편하게 정산할 수 있어요`}</Text>
    </div>
  );
};

export default DescriptionSection;
