/** @jsxImportSource @emotion/react */
import {useTheme} from '@theme/HDesignProvider';
import Text from '@components/Text/Text';

import {descriptionStyle, titleContainerStyle, titleStyle} from './Title.style';

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
