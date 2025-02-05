import {useRef} from 'react';

import Image from '@components/Design/components/Image/Image';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './RecordMemoryWithPhoto.style';

const RecordMemoryWithPhoto = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {imageSrc, fallbackImageSrc} = useImageLazyLoading({
    targetRef: sectionRef,
    src: getImageUrl('feature5', 'webp'),
    fallbackSrc: getImageUrl('feature5', 'png'),
    threshold: 0.05,
  });

  return (
    <section css={sectionStyle} ref={sectionRef}>
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
        <Image src={imageSrc!} fallbackSrc={fallbackImageSrc} css={imageStyle} />
      </article>
    </section>
  );
};

export default RecordMemoryWithPhoto;
