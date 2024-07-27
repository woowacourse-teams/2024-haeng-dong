/** @jsxImportSource @emotion/react */
import {useTheme} from '@/theme/HDesignProvider';
import {StepItemCustomProps} from './StepItem.type';
import {nameStyle, personCountStyle, stepItemStyle, totalAmountStyle, totalTitleStyle} from './StepItem.style';
import Text from '../Text/Text';
import BillItem from '../BillItem/BillItem';
import {BillItemCustomProps} from '../BillItem/BillItem.type';
import Flex from '../Flex/Flex';

export const StepItem: React.FC<StepItemCustomProps> = ({
  name = '',
  personCount = 0,
  bills,
  ...htmlProps
}: StepItemCustomProps) => {
  const {theme} = useTheme();
  return (
    <div css={stepItemStyle(theme)} {...htmlProps}>
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem">
        <Text css={nameStyle(theme)} size="captionBold">
          {name}
        </Text>
        <Text css={personCountStyle(theme)} size="caption">
          {personCount}명
        </Text>
      </Flex>
      {bills.map((props: BillItemCustomProps) => (
        <BillItem {...props} />
      ))}
      <Flex justifyContent="spaceBetween" paddingInline="0.5rem">
        <Text css={totalTitleStyle(theme)} size="captionBold">
          총액
        </Text>
        <Text css={totalAmountStyle(theme)} size="caption">
          {bills.reduce((acc, prev) => acc + (prev.price ?? 0), 0).toLocaleString('ko-kr')}원
        </Text>
      </Flex>
    </div>
  );
};
export default StepItem;
