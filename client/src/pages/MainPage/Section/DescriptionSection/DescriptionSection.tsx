import {useRef} from 'react';

import Text from '@HDesign/components/Text/Text';
import Image from '@components/Design/components/Image/Image';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import getImageUrl from '@utils/getImageUrl';

import {descriptionSectionStyle, imgStyle} from './DescriptionSection.style';

const DescriptionSection = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  const {imageSrc, fallbackImageSrc} = useImageLazyLoading({
    targetRef: descriptionRef,
    src: `${process.env.IMAGE_URL}/standingDog.webp`,
    fallbackSrc: `${process.env.IMAGE_URL}/standingDog.png`,
    threshold: 0.05,
  });

  return (
    <div css={descriptionSectionStyle} ref={descriptionRef}>
      <Image css={imgStyle} src={imageSrc!} alt="행댕이 - 행동대장 마스코트" fallbackSrc={fallbackImageSrc} />
      <img css={imgStyle} />
      <Text style={{textAlign: 'center'}} size="subTitle" responsive={true}>{`행동대장들을 위해
        행동대장을 준비했어요
          `}</Text>
      <Text style={{textAlign: 'center'}} size="subTitle" responsive={true} textColor="gray">{`주환이가 먼저 집에 가도
        소연이가 늦게 도착해도
        건상이가 술을 마시지 않아도
          `}</Text>
      <Text style={{textAlign: 'center'}} size="subTitle" responsive={true}>{`간편하게 정산할 수 있어요`}</Text>
    </div>
  );
};

export default DescriptionSection;
