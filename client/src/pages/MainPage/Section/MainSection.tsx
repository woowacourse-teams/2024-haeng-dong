import {css, keyframes} from '@emotion/react';
import {useNavigate} from 'react-router-dom';

import Button from '@HDesign/components/Button/Button';
import Text from '@HDesign/components/Text/Text';

import {ROUTER_URLS} from '@constants/routerUrls';

import {Icon} from '@components/Design';

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
    <div
      css={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      })}
    >
      <div
        css={css({
          position: 'fixed',
          height: '100vh',
          top: 0,
          zIndex: -1,
        })}
      >
        <img
          css={css({
            height: '100vh',
            objectFit: 'cover',
          })}
          src={`${process.env.IMAGE_URL}/mainSectionBackground.png`}
          alt=""
        />
      </div>
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
          padding: '1.5rem',
          height: '100%',
        })}
      >
        <Text css={animateWithDelay(0)} textColor="white" style={{textAlign: 'left'}} size="title">{`행동대장으로
        간편하게 정산하세요
        `}</Text>
        <Button variants="tertiary" id="startCreateEvent" css={animateWithDelay(1)} size="large" onClick={handleClick}>
          정산 시작하기
        </Button>
      </div>
      <div
        css={css({
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          animation: `${bounce} 2s infinite ease-in-out`,
        })}
      >
        <Icon iconType="chevronDown" />
      </div>
    </div>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(1rem);
  }
  to {
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, -1rem);
  }
`;

const animateWithDelay = (delay: number) => css`
  opacity: 0;
  animation:
    ${fadeIn} 1s ease-in-out ${delay}s forwards,
    ${slideIn} 1s ease-in-out ${delay}s forwards;
`;

export default MainSection;
