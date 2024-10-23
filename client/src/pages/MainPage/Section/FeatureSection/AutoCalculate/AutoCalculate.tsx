import {useRef} from 'react';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import {Text} from '@components/Design';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './AutoCalculate.style';

const AutoCalculate = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {imageSrc} = useImageLazyLoading({
    targetRef: sectionRef,
    src: `${process.env.IMAGE_URL}/feature2.svg`,
    threshold: 0.05,
  });

  return (
    <section css={sectionStyle} ref={sectionRef}>
      <article css={articleStyle}>
        <img src={imageSrc} css={imageStyle} alt="차등 정산 계산을 쉽게 해주는 UI 이미지" />
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
      </article>
    </section>
  );
};

export default AutoCalculate;
