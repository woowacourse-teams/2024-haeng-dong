/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';

import {CreatedEvent} from 'types/serviceType';

import useLongPressAnimation from '@hooks/useLongPressAnimation';

import {Checkbox} from '@components/Design';

import Flex from '../Flex/Flex';

import {touchAreaStyle} from './CreatedEventItem.style';
import {CreatedEventView} from './CreatedEventView';

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

  const {handleTouchStart, handleTouchEnd, handleTouchMove} = useLongPressAnimation(onLongPress, {
    disabled: isEditMode,
  });

  const onClick = () => {
    isEditMode ? onChange(createdEvent) : navigate(`/event/${createdEvent.eventId}/admin`);
  };

  return (
    <Flex width="100%">
      {isEditMode && <Checkbox isChecked={isChecked} onChange={() => onChange(createdEvent)} />}
      <Flex
        justifyContent="spaceBetween"
        alignItems="center"
        paddingInline="0.5rem"
        width="100%"
        onClick={onClick}
        css={touchAreaStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CreatedEventView {...createdEvent} />
      </Flex>
    </Flex>
  );
}
