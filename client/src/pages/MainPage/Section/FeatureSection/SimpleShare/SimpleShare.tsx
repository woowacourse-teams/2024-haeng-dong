import {useRef} from 'react';

import Image from '@components/Design/components/Image/Image';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './SimpleShare.style';

const SimpleAccount = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {imageSrc, fallbackImageSrc} = useImageLazyLoading({
    targetRef: sectionRef,
    src: getImageUrl('feature1', 'webp'),
    fallbackSrc: getImageUrl('feature1', 'png'),
    threshold: 0.05,
  });

  return (
    <section css={sectionStyle} ref={sectionRef}>
      <article css={articleStyle}>
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
        <Image src={imageSrc!} fallbackSrc={fallbackImageSrc} css={imageStyle} />
      </article>
    </section>
  );
};

export default SimpleAccount;
