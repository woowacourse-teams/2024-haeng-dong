/** @jsxImportSource @emotion/react */
import Flex from '@HDcomponents/Flex/Flex';
import Text from '@HDcomponents/Text/Text';
import {amountContainerStyle, titleContainerStyle, titleStyle} from '@HDcomponents/Title/Title.style';
import {TitleProps} from '@HDcomponents/Title/Title.type';
import {useTheme} from '@theme/HDesignProvider';

import Amount from '../Amount/Amount';

export const Title: React.FC<TitleProps> = ({title, amount, dropdown}: TitleProps) => {
  const {theme} = useTheme();
  return (
    <div css={titleStyle(theme)}>
      <div css={titleContainerStyle}>
        <Text size="subTitle">{title}</Text>
        {dropdown}
      </div>
      <div css={amountContainerStyle}>
        <Text textColor="gray" size="caption">
          전체 지출 금액
        </Text>
        <Amount amount={amount ?? 0} />
      </div>
    </div>
  );
};

export default Title;
