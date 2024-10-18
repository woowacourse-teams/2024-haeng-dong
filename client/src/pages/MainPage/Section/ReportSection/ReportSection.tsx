import Text from '@components/Design/components/Text/Text';

import {reportSectionStyle, textContainerStyle} from './ReportSection.style';

const ReportSection = () => {
  return (
    <div css={reportSectionStyle}>
      <div css={textContainerStyle}>
        <Text size="subTitle">친구에게 링크를 공유하세요</Text>
        <Text size="body" textColor="gray">
          {`지출내역과 인원변동을 통해
          금액은 자동으로 계산돼요`}
        </Text>
      </div>
      <img src={`${process.env.IMAGE_URL}/memberReportMockup.svg`} />
    </div>
  );
};

export default ReportSection;
