import {Flex, Text} from '@components/Design';

import FALLBACK_TEXT from '../fallbackText';

const BillEmptyFallback = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="1.5rem" width="100%" height="20rem">
      <Text size="subTitle">{FALLBACK_TEXT.billEmptyTitle}</Text>
      <Text size="body" style={{textAlign: 'center'}}>
        {FALLBACK_TEXT.billEmptyHome}
      </Text>
    </Flex>
  );
};

export default BillEmptyFallback;
