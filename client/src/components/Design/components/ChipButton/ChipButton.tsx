/** @jsxImportSource @emotion/react */

import {ColorKeys} from '@components/Design/token/colors';
import useTheme from '@components/Design/theme/useTheme';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

import {chipButtonStyle} from './ChipButton.style';

interface Props {
  color: ColorKeys;
  text: string;
  onClick: () => void;
}

const ChipButton = ({color, text, onClick}: Props) => {
  const {theme} = useTheme();
  return (
    <div css={chipButtonStyle({color, theme})}>
      <Text textColor="black">{text}</Text>
      <Icon iconType="inputDelete" onClick={onClick} />
    </div>
  );
};

export default ChipButton;
