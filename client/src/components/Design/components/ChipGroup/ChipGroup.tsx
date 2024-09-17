/** @jsxImportSource @emotion/react */

import {ColorKeys} from '@components/Design/token/colors';
import {chipStyle} from '../Chip/Chip.style';
import {useTheme} from '@components/Design/theme/HDesignProvider';
import Text from '../Text/Text';
import {chipGroupStyle} from './ChipGroup.style';
import Chip from '../Chip/Chip';

interface Props {
  color: ColorKeys;
  texts: string[];
}

const ChipGroup = ({color, texts}: Props) => {
  return (
    <div css={chipGroupStyle}>
      {texts.map(text => (
        <Chip color={color} text={text} />
      ))}
    </div>
  );
};

export default ChipGroup;
