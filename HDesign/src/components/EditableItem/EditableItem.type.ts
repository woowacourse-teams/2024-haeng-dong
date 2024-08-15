import {Theme} from '@theme/theme.type';

import {ColorKeys} from '@token/colors';

export interface EditableItemStyleProps {
  backgroundColor: ColorKeys;
}

export interface EditableItemCustomProps {
  onInputFocus?: () => void;
  onInputBlur?: () => void;
}

export interface EditableItemStylePropsWithTheme extends EditableItemStyleProps {
  theme: Theme;
}

export type EditableItemOptionProps = EditableItemStyleProps & EditableItemCustomProps;

export type EditableItemProps = React.ComponentProps<'div'> & EditableItemOptionProps;
