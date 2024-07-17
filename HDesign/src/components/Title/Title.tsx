/** @jsxImportSource @emotion/react */
import Text from '@components/Text/Text';
import {descriptionStyle, titleContainerStyle, titleStyle} from '@components/Title/Title.style';
import {TitleProps} from '@components/Title/Title.type';

import {useTheme} from '@theme/HDesignProvider';

export const Title: React.FC<TitleProps> = ({title, description}: TitleProps) => {
  const {theme} = useTheme();
  return (
    <div css={titleContainerStyle}>
      <Text css={titleStyle(theme)} size="subTitle">
        {title}
      </Text>
      <Text css={descriptionStyle(theme)}>{description}</Text>
    </div>
  );
};

export default Title;
