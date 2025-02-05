import {useRef} from 'react';

import Image from '@components/Design/components/Image/Image';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './CheckDeposit.style';

const CheckDeposit = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const {imageSrc, fallbackImageSrc} = useImageLazyLoading({
    targetRef: sectionRef,
    src: getImageUrl('feature3', 'webp'),
    fallbackSrc: getImageUrl('feature3', 'png'),
    threshold: 0.05,
  });

  return (
    <section css={sectionStyle} ref={sectionRef}>
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
        <Image src={imageSrc!} fallbackSrc={fallbackImageSrc} css={imageStyle} />
      </article>
    </section>
  );
};

export default CheckDeposit;
