/** @jsxImportSource @emotion/react */

import {ColorKeys} from '@components/Design/token/colors';
import {useTheme} from '@components/Design/theme/HDesignProvider';

import {chipStyle} from '../Chip/Chip.style';
import Text from '../Text/Text';
import Chip from '../Chip/Chip';

import {chipGroupStyle} from './ChipGroup.style';

interface Props {
  color: ColorKeys;
  texts: string[];
}

const ChipGroup = ({color, texts}: Props) => {
  return (
    <div css={chipGroupStyle}>
      {texts.map(text => (
        <Chip key={text} color={color} text={text} />
      ))}
    </div>
  );
};

export default ChipGroup;
