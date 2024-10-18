import {Text} from '@components/Design';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './SimpleTransfer.style';

const SimpleTransfer = () => {
  return (
    <section css={sectionStyle}>
      <article css={articleStyle}>
        <img src={`${process.env.IMAGE_URL}/feature4.svg`} css={imageStyle} />
        <div css={textContainerStyle}>
          <Text size="subTitle" responsive={true}>
            몇 번의 클릭으로 송금 완료!
          </Text>
          <Text size="body" responsive={true}>
            {`계좌번호나 금액을 일일이 확인하지 않아도 돼요.
      클릭 몇 번으로 바로 송금할 수 있어요.
      언제 어디서든 쉽게 정산을 끝내세요.`}
          </Text>
        </div>
      </article>
    </section>
  );
};

export default SimpleTransfer;
