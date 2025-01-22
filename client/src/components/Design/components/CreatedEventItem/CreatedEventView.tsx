/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';

import {useTheme} from '@components/Design/theme/HDesignProvider';
import {CreatedEvent} from 'types/serviceType';

import {TextButton, Flex, Text} from '@components/Design';

import {inProgressCheckStyle} from './CreatedEventItem.style';

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

export const CreatedEventView = ({eventName, isFinished, eventId}: CreatedEvent) => {
  const navigate = useNavigate();

  return (
    <Flex
      width="100%"
      gap="0.5rem"
      minHeight="2.5rem"
      alignItems="center"
      onClick={() => navigate(`/event/${eventId}/admin`)}
    >
      <InProgressCheck inProgress={!isFinished} />
      <TextButton textSize="bodyBold" textColor="onTertiary">
        {eventName}
      </TextButton>
    </Flex>
  );
};
