import Button from '@HDesign/components/Button/Button';
import Text from '@HDesign/components/Text/Text';

import {Icon} from '@components/Design';

import {
  animateWithDelay,
  backgroundImageStyle,
  backgroundStyle,
  chevronStyle,
  mainSectionStyle,
  sectionStyle,
} from './MainSection.style';
import useMainSectionBackgroundScroll from '@hooks/useMainSectionBackgroundScroll';

type MainSectionProps = {
  trackStartCreateEvent: () => void;
};

const MainSection = ({trackStartCreateEvent}: MainSectionProps) => {
  const {isVisible, handleClick} = useMainSectionBackgroundScroll(trackStartCreateEvent);

  return (
    <div css={mainSectionStyle}>
      <div css={backgroundStyle}>
        <img css={backgroundImageStyle(isVisible)} src={`${process.env.IMAGE_URL}/mainSectionBackground.png`} alt="" />
      </div>
      <div css={sectionStyle}>
        <Text css={animateWithDelay(0)} textColor="white" style={{textAlign: 'left'}} size="title">{`행동대장으로
        간편하게 정산하세요
        `}</Text>
        <Button variants="tertiary" id="startCreateEvent" css={animateWithDelay(1)} size="large" onClick={handleClick}>
          정산 시작하기
        </Button>
      </div>
      <div css={chevronStyle}>
        <Icon iconType="chevronDown" />
      </div>
    </div>
  );
};

export default MainSection;
