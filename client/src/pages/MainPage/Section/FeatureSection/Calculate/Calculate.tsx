import {Text} from '@components/Design';

import {backgroundStyle, imageStyle, sectionStyle, textContainerStyle} from './Calculate.style';

const Calculate = () => {
  return (
    <div css={backgroundStyle}>
      <div css={sectionStyle}>
        <img src={`${process.env.IMAGE_URL}/feature2.svg`} css={imageStyle} />
        <div css={textContainerStyle}>
          <Text size="subTitle" responsive={true}>
            계산은 저희가 알아서 해드려요
          </Text>
          <Text size="body" responsive={true}>
            {`인원이나 메뉴에 따라 직접 계산할 필요 없어요.
              지출 내역만 기록하면 알아서 나눠 계산해 드려요.
              복잡한 계산은 이제 행동대장에게 맡기세요!`}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
