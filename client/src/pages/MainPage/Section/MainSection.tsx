import {css, keyframes} from '@emotion/react';
import {useNavigate} from 'react-router-dom';

import ChevronDown from '@assets/image/chevronDownLarge.svg';
import Button from '@HDesign/components/Button/Button';
import Text from '@HDesign/components/Text/Text';

import useAmplitude from '@hooks/useAmplitude';

import {ROUTER_URLS} from '@constants/routerUrls';

const MainSection = () => {
  const navigate = useNavigate();

  const {trackStartCreateEvent} = useAmplitude();

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
          <img src={`${process.env.IMAGE_URL}/standingDog.svg`} />
        </div>
        <Text css={animateWithDelay(1)} style={{textAlign: 'center'}} size="title">{`행동대장을 통해
        간편하게 정산하세요
        `}</Text>
        <Button id="startCreateEvent" css={animateWithDelay(2)} size="large" onClick={handleClick}>
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
