import {css} from '@emotion/react';

import {Text} from '@HDesign/index';
import {useTheme} from '@HDesign/index';
import AddMemberMockup from '@assets/image/addMemberMockup.svg';

const AddMemberSection = () => {
  const {theme} = useTheme();
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        gap: '2rem',
        width: '100%',
        backgroundColor: theme.colors.lightGrayContainer,
      })}
    >
      <div css={css({display: 'flex', flexDirection: 'column', gap: '1rem'})}>
        <Text size="subTitle">인원 변동은 신경쓰지 마세요</Text>
        <Text size="body" textColor="gray">
          {`누가 나가고 들어왔는지만 기록하세요
          행동대장이 알아서 차수를 나눠줘요`}
        </Text>
      </div>
      <AddMemberMockup />
    </div>
  );
};

export default AddMemberSection;
