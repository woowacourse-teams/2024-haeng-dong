import {Flex, Text} from '@components/Design';

const BillEmptyFallback = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="1.5rem" width="100%" height="20rem">
      <Text size="subTitle">행사가 시작되지 않았어요</Text>
      <Text size="body" style={{textAlign: 'center'}}>
        주최자가 아직 지출 내역을 등록하지 않았어요
      </Text>
    </Flex>
  );
};

export default BillEmptyFallback;
