import {Text} from '@components/Design';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './CheckDeposit.style';

const CheckDeposit = () => {
  return (
    <section css={sectionStyle}>
      <article css={articleStyle}>
        <div css={textContainerStyle}>
          <Text size="subTitle" responsive={true}>
            입금 확인도 걱정 없어요
          </Text>
          <Text size="body" responsive={true}>
            {`매번 누가 입금했는지 따로 기억할 필요 없어요.
            참여자 관리 메뉴를 통해 더 이상 놓치는 사람 없이
            간편하게 관리할 수 있어요.`}
          </Text>
        </div>
        <object type="image/svg+xml" data={`${process.env.IMAGE_URL}/feature3.svg`} css={imageStyle} />
      </article>
    </section>
  );
};

export default CheckDeposit;
