/** @jsxImportSource @emotion/react */
import Text from '@components/Text/Text';
import {priceContainerStyle, titleContainerStyle} from '@components/Title/Title.style';
import {TitleProps} from '@components/Title/Title.type';

import {useTheme} from '@theme/HDesignProvider';

export const Title: React.FC<TitleProps> = ({title, description, price}: TitleProps) => {
  const {theme} = useTheme();
  return (
    <div css={titleContainerStyle(theme)}>
      <Text size="subTitle">{title}</Text>
      {description && (
        <Text textColor="darkGray" size="caption">
          {description}
        </Text>
      )}
      {price !== undefined && (
        <div css={priceContainerStyle}>
          <Text textColor="gray" size="caption">
            전체 지출 금액
          </Text>
          <Text>{price.toLocaleString('ko-kr')}원</Text>
        </div>
      )}
    </div>
  );
};

export default Title;
