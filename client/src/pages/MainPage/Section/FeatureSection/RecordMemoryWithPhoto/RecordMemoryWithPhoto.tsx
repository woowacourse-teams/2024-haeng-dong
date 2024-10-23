import {useRef} from 'react';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import {Text} from '@components/Design';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './RecordMemoryWithPhoto.style';

type RecordMemoryWithPhotoProps = {
  targetRef: React.RefObject<HTMLElement>;
};

const RecordMemoryWithPhoto = ({targetRef}: RecordMemoryWithPhotoProps) => {
  const {imageSrc} = useImageLazyLoading({
    targetRef,
    src: `${process.env.IMAGE_URL}/feature5.svg`,
    threshold: 0.05,
  });

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
        <object type="image/svg+xml" data={imageSrc} css={imageStyle} />
      </article>
    </section>
  );
};

export default RecordMemoryWithPhoto;
