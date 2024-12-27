import {useNavigate} from 'react-router-dom';

import Button from '@HDesign/components/Button/Button';
import Text from '@HDesign/components/Text/Text';
import {User} from 'types/serviceType';

import {Icon} from '@components/Design';

import {ROUTER_URLS} from '@constants/routerUrls';

import {animateWithDelay, chevronStyle, mainSectionStyle, sectionStyle} from './MainSection.style';

type NavProps = Pick<User, 'isGuest'>;

const MainSection = ({isGuest}: NavProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isGuest ? ROUTER_URLS.login : ROUTER_URLS.createUserEvent);
  };

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
