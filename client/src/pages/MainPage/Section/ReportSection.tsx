import {css} from '@emotion/react';

import MemberReportMockup from '@assets/image/memberReportMockup.svg';

import {Text} from '@HDesign/index';

const ReportSection = () => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        gap: '2rem',
        width: '100%',
        backgroundColor: 'white',
      })}
    >
      <div css={css({display: 'flex', flexDirection: 'column', gap: '1rem'})}>
        <Text size="subTitle">친구에게 링크를 공유하세요</Text>
        <Text size="body" textColor="gray">
          {`지출내역과 인원변동을 통해
          금액은 자동으로 계산돼요`}
        </Text>
      </div>
      <MemberReportMockup />
    </div>
  );
};

export default ReportSection;