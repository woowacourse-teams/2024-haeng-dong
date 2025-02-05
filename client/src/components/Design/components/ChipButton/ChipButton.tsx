/** @jsxImportSource @emotion/react */

import {ColorKeys} from '@components/Design/token/colors';
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';
import IconButton from '../IconButton/IconButton';
import {IconXCircle} from '../Icons/Icons/IconXCircle';

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
      <IconButton variants="none" onClick={onClick} aria-label="인원 지우기">
        <IconXCircle />
      </IconButton>
    </div>
  );
};

export default ChipButton;
