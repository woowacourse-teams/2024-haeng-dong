import {css} from '@emotion/react';

import Text from '@HDesign/components/Text/Text';
import useTheme from '@components/Design/theme/useTheme';

const DescriptionSection = () => {
  const {theme} = useTheme();

  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '1.5rem',
        padding: '3rem 1.5rem',
        backgroundColor: theme.colors.lightGrayContainer,
      })}
    >
      <Text style={{textAlign: 'center'}} size="subTitle">{`행동대장들을 위해
        행동대장을 준비했어요
          `}</Text>
      <Text style={{textAlign: 'center'}} size="subTitle" textColor="gray">{`주환이가 먼저 집에 가도
        소연이가 늦게 도착해도
        건상이가 술을 마시지 않아도
          `}</Text>
      <Text style={{textAlign: 'center'}} size="subTitle">{`간편하게 정산할 수 있어요`}</Text>
    </div>
  );
};

export default DescriptionSection;
