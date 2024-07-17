/** @jsxImportSource @emotion/react */
import {useTheme} from '@/theme/HDesignProvider';
import {StepItemCustomProps} from './StepItem.type';
import {
  footerStyle,
  headerStyle,
  nameStyle,
  personCountStyle,
  stepItemStyle,
  totalAmountStyle,
  totalTitleStyle,
} from './StepItem.style';
import Text from '../Text/Text';
import BillItem from '../BillItem/BillItem';
import {BillItemCustomProps} from '../BillItem/BillItem.type';

export const StepItem: React.FC<StepItemCustomProps> = ({
  name = '',
  personCount = 0,
  bills,
  ...htmlProps
}: StepItemCustomProps) => {
  const {theme} = useTheme();
  return (
    <div css={stepItemStyle(theme)} {...htmlProps}>
      <div css={headerStyle}>
        <Text css={nameStyle(theme)} size="captionBold">
          {name}
        </Text>
        <Text css={personCountStyle(theme)} size="caption">
          {personCount}명
        </Text>
      </div>
      {bills.map((props: BillItemCustomProps) => (
        <BillItem {...props} />
      ))}
      <div css={footerStyle}>
        <Text css={totalTitleStyle(theme)} size="bodyBold">
          총액
        </Text>
        <Text css={totalAmountStyle(theme)} size="body">
          {bills.reduce((acc, prev) => acc + (prev.price ?? 0), 0).toLocaleString('ko-kr')} 원
        </Text>
      </div>
    </div>
  );
};
export default StepItem;
