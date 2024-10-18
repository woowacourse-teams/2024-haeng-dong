import {Text} from '@components/Design';

import {backgroundStyle, imageStyle, sectionStyle, textContainerStyle} from './SimpleShare.style';

const SimpleAccount = () => {
  return (
    <div css={backgroundStyle}>
      <div css={sectionStyle}>
        <div css={textContainerStyle}>
          <Text size="subTitle" responsive={true}>
            누구와도 간편하게 정산하세요
          </Text>
          <Text size="body" responsive={true}>
            {`연락처가 없어도 링크만 보내면 끝!,
          모르는 사람과도 손쉽게 정산할 수 있어요.
          복잡한 절차 없이, 빠르게 정산을 마치세요.`}
          </Text>
        </div>
        <img src={`${process.env.IMAGE_URL}/feature1.svg`} css={imageStyle} />
      </div>
    </div>
  );
};

export default SimpleAccount;
