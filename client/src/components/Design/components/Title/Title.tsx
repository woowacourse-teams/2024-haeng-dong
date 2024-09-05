/** @jsxImportSource @emotion/react */
import Flex from '@HDcomponents/Flex/Flex';
import Text from '@HDcomponents/Text/Text';
import {priceContainerStyle, titleContainerStyle} from '@HDcomponents/Title/Title.style';
import {TitleProps} from '@HDcomponents/Title/Title.type';
import {useTheme} from '@theme/HDesignProvider';

export const Title: React.FC<TitleProps> = ({title, description, price}: TitleProps) => {
  const {theme} = useTheme();
  return (
    <div css={titleContainerStyle(theme)}>
      <Text size="subTitle">{title}</Text>
      {description && (
        <Text textColor="darkGray" size="body">
          {description}
        </Text>
      )}
      {price !== undefined && (
        <div css={priceContainerStyle}>
          <Text textColor="gray" size="caption">
            전체 지출 금액
          </Text>
          <Flex alignItems="center" gap="0.25rem">
            <Text>{price.toLocaleString('ko-kr')}</Text>
            <Text size="caption">원</Text>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Title;
