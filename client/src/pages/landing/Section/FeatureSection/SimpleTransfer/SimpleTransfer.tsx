import {useRef} from 'react';

import Image from '@components/Design/components/Image/Image';

import useImageLazyLoading from '@hooks/useImageLazyLoading';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {articleStyle, imageStyle, sectionStyle, textContainerStyle} from './SimpleTransfer.style';

const SimpleTransfer = () => {
  const simpleTransferRef = useRef<HTMLElement>(null);

  const {imageSrc, fallbackImageSrc} = useImageLazyLoading({
    targetRef: simpleTransferRef,
    src: getImageUrl('feature4', 'webp'),
    fallbackSrc: getImageUrl('feature4', 'png'),
    threshold: 0.05,
  });

  return (
    <section css={sectionStyle} ref={simpleTransferRef}>
      <article css={articleStyle}>
        <Image src={imageSrc!} fallbackSrc={fallbackImageSrc} css={imageStyle} />
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
