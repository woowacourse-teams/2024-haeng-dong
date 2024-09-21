/** @jsxImportSource @emotion/react */
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

interface Props {
  amount: number;
}

const Amount = ({amount}: Props) => {
  return (
    <Flex alignItems="center" gap="0.25rem">
      <Text>{amount ? amount.toLocaleString('ko-kr') : 0}</Text>
      <Text size="tiny" textColor="gray">
        원
      </Text>
    </Flex>
  );
};

export default Amount;
