/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';

import Text from '@HDcomponents/Text/Text';

import {useTheme} from '@components/Design';

import Flex from '../Flex/Flex';
import Input from '../Input/Input';

import {CreatedEventItemProps, CreatedEventListProps} from './CreatedEvent.type';
import {inProgressCheckStyle, rippleDefaultStyle, touchAreaStyle} from './CreatedEvent.style';

function InProgressCheck({inProgress}: {inProgress: boolean}) {
  const {theme} = useTheme();

  return (
    <div css={inProgressCheckStyle({theme, inProgress})}>
      <Text size="tiny" className="in-progress-check-text">
        {inProgress ? '정산 중' : '정산 완료'}
      </Text>
    </div>
  );
}

export type RippleAnimation = {
  x: number;
  y: number;
  size: number;
};

function CreatedEventItem({createdEvent}: CreatedEventItemProps) {
  const navigate = useNavigate();

  const {theme} = useTheme();
  const [ripple, setRipple] = useState<RippleAnimation | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setRipple({x, y, size: 0});

    timeoutRef.current = setTimeout(() => {
      console.log('Callback executed!');
    }, 500);
  };

  const handleTouchMove = () => {
    clearTimeout(timeoutRef.current!);
    setRipple(null);
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = null;
  };

  const onClick = () => {
    navigate(`/event/${createdEvent.eventId}/admin`);
  };

  return (
    <Flex
      justifyContent="spaceBetween"
      alignItems="center"
      height="2.5rem"
      padding="0.5rem 1rem"
      paddingInline="0.5rem"
      onClick={onClick}
      css={touchAreaStyle({theme})}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {ripple && (
        <div
          css={rippleDefaultStyle({theme, ...ripple})}
          onAnimationStart={() => setRipple(prev => prev && {...prev, size: 400})}
        />
      )}
      <Flex gap="0.5rem" alignItems="center">
        <InProgressCheck inProgress={createdEvent.isFinished} />
        <Text size="bodyBold" color="onTertiary">
          {createdEvent.eventName}
        </Text>
      </Flex>
    </Flex>
  );
}

function CreatedEventList({createdEvents, eventName, onSearch, placeholder}: CreatedEventListProps) {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      backgroundColor="white"
      padding="0.5rem 1rem"
      paddingInline="0.5rem"
      gap="0.5rem"
      height="100%"
      cssProp={{borderRadius: '1rem'}}
    >
      <Input inputType="search" value={eventName} onChange={onSearch} placeholder={placeholder} />
      {createdEvents.length !== 0 &&
        createdEvents.map(createdEvent => <CreatedEventItem key={createdEvent.eventId} createdEvent={createdEvent} />)}
    </Flex>
  );
}

export default CreatedEventList;
