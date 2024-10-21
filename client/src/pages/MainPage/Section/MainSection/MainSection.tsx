import {useNavigate} from 'react-router-dom';

import Button from '@HDesign/components/Button/Button';
import Text from '@HDesign/components/Text/Text';
import Image from '@components/Design/components/Image/Image';

import {Icon} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import {
  animateWithDelay,
  backgroundImageStyle,
  backgroundStyle,
  chevronStyle,
  mainSectionStyle,
  sectionStyle,
} from './MainSection.style';

type MainSectionProps = {
  trackStartCreateEvent: () => void;
};

const MainSection = ({trackStartCreateEvent}: MainSectionProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    trackStartCreateEvent();
    navigate(ROUTER_URLS.createEvent);
  };

  return (
    <div css={mainSectionStyle}>
      <div css={backgroundStyle}>
        <Image
          css={backgroundImageStyle}
          src={getImageUrl('mainSectionBackground', 'webp')}
          alt=""
          fallbackSrc={getImageUrl('mainSectionBackground', 'png')}
        />
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
