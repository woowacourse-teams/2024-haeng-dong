/** @jsxImportSource @emotion/react */
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {CreatedEvent} from 'types/serviceType';

import Flex from '../Flex/Flex';
import Text from '../Text/Text';

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

export const CreatedEventView = ({eventName, isFinished}: CreatedEvent) => {
  return (
    <Flex gap="0.5rem" minHeight="2.5rem" alignItems="center">
      <InProgressCheck inProgress={!isFinished} />
      <Text size="bodyBold" color="onTertiary">
        {eventName}
      </Text>
    </Flex>
  );
};
