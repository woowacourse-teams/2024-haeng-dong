/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';

import Text from '@HDcomponents/Text/Text';
import {CreatedEvent} from 'types/serviceType';

import useLongPressAnimation from '@hooks/useLongPressAnimation';

import {Checkbox, useTheme} from '@components/Design';

import Flex from '../Flex/Flex';

import {inProgressCheckStyle, touchAreaStyle} from './CreatedEvent.style';

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

export interface CreatedEventItemProps {
  setEditMode: () => void;
  isEditMode: boolean;
  isChecked: boolean;
  onChange: (event: CreatedEvent) => void;
  createdEvent: CreatedEvent;
}

export function CreatedEventItem({isEditMode, setEditMode, isChecked, onChange, createdEvent}: CreatedEventItemProps) {
  const navigate = useNavigate();

  const onLongPress = () => {
    setEditMode();
    if (!isChecked) onChange(createdEvent);
  };

  const {handleTouchStart, handleTouchEnd, handleTouchMove, LongPressAnimation} = useLongPressAnimation(onLongPress, {
    disabled: isEditMode,
  });

  const onClick = () => {
    isEditMode ? onChange(createdEvent) : navigate(`/event/${createdEvent.eventId}/admin`);
  };

  return (
    <Flex>
      {isEditMode && <Checkbox isChecked={isChecked} onChange={() => onChange(createdEvent)} />}
      <Flex
        justifyContent="spaceBetween"
        alignItems="center"
        height="2.5rem"
        padding="0.5rem 1rem"
        paddingInline="0.5rem"
        onClick={onClick}
        css={touchAreaStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {LongPressAnimation}
        <Flex gap="0.5rem" alignItems="center">
          <InProgressCheck inProgress={createdEvent.isFinished} />
          <Text size="bodyBold" color="onTertiary">
            {createdEvent.eventName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
