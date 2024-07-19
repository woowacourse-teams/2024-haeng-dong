/** @jsxImportSource @emotion/react */
import Text from '@components/Text/Text';
import {
  descriptionStyle,
  priceContainerStyle,
  priceStyle,
  priceTitleStyle,
  titleContainerStyle,
  titleStyle,
} from '@components/Title/Title.style';
import {TitleProps} from '@components/Title/Title.type';

import {useTheme} from '@theme/HDesignProvider';

export const Title: React.FC<TitleProps> = ({title, description, price}: TitleProps) => {
  const {theme} = useTheme();
  return (
    <div css={titleContainerStyle(theme)}>
      <Text css={titleStyle(theme)} size="subTitle">
        {title}
      </Text>
      {description && (
        <Text css={descriptionStyle(theme)} size="caption">
          {description}
        </Text>
      )}
      {price && (
        <div css={priceContainerStyle}>
          <Text css={priceTitleStyle(theme)} size="caption">
            전체 지출 금액
          </Text>
          <Text css={priceStyle(theme)}>{price.toLocaleString('ko-kr')} 원</Text>
        </div>
      )}
    </div>
  );
};

export default Title;
