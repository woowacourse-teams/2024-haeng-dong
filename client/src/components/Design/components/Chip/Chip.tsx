/** @jsxImportSource @emotion/react */

import {ColorKeys} from '@components/Design/token/colors';
import {useTheme} from '@components/Design/theme/HDesignProvider';

import Text from '../Text/Text';

import {chipStyle} from './Chip.style';

interface Props {
  color: ColorKeys;
  text: string;
}

const Chip = ({color, text}: Props) => {
  const {theme} = useTheme();
  return (
    <div css={chipStyle({color, theme})}>
      <Text size="tiny" textColor={color}>
        {text}
      </Text>
    </div>
  );
};

export default Chip;
