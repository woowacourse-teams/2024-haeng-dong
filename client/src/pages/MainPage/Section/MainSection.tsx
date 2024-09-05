import {css, keyframes} from '@emotion/react';
import {Button, Text} from '@HDesign/index';
import {useNavigate} from 'react-router-dom';

import {StandingDog} from '@components/Common/Logo';
import ChevronDown from '@assets/image/chevronDownLarge.svg';

import {ROUTER_URLS} from '@constants/routerUrls';

const MainSection = () => {
  const navigate = useNavigate();
  return (
    <div
      css={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: 'white',
      })}
    >
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          padding: '1.5rem',
          height: '100vh',
          width: '100%',
        })}
      >
        <div css={animateWithDelay(0)}>
          <StandingDog />
        </div>
        <Text css={animateWithDelay(1)} style={{textAlign: 'center'}} size="title">{`행동대장을 통해
        간편하게 정산하세요
        `}</Text>
        <Button css={animateWithDelay(2)} size="large" onClick={() => navigate(ROUTER_URLS.eventCreateName)}>
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
        <ChevronDown />
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
