import Button from '@HDesign/components/Button/Button';
import Text from '@HDesign/components/Text/Text';

import {Icon} from '@components/Design';

import {animateWithDelay, chevronStyle, mainSectionStyle, sectionStyle} from './MainSection.style';
import useMainSection from '@hooks/useMainSection';

type MainSectionProps = {
  trackStartCreateEvent: () => void;
};

const MainSection = ({trackStartCreateEvent}: MainSectionProps) => {
  const {handleClick} = useMainSection(trackStartCreateEvent);

  return (
    <div css={mainSectionStyle}>
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
