import {Text} from '@components/Design';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './Photo.style';

const Photo = () => {
  return (
    <section css={sectionStyle}>
      <article css={articleStyle}>
        <div css={textContainerStyle}>
          <Text size="subTitle" responsive={true}>
            추억도 간편하게 공유하세요
          </Text>
          <Text size="body" responsive={true}>
            {`모임에서 지출한 내역은 물론,
        그날의 사진과 추억도 함께 나눠보세요.
        정산은 투명하게, 추억은 오래오래 간직할 수 있어요.`}
          </Text>
        </div>
        <img src={`${process.env.IMAGE_URL}/feature5.svg`} css={imageStyle} />
      </article>
    </section>
  );
};

export default Photo;
