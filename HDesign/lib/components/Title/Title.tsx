/** @jsxImportSource @emotion/react */
import {useTheme} from '../../theme/HDesignProvider';
import Text from '../Text/Text';
import {descriptionStyle, titleContainerStyle, titleStyle} from './Title.style';

interface TitleProps {
  title: string;
  description?: string;
}

export const Title = ({title, description}: TitleProps) => {
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
