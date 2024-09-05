import {TextSize} from '@HDcomponents/Text/Text.type';

import {Theme} from '@theme/theme.type';

export interface InputStyleProps {
  hasError?: boolean;
  textSize?: TextSize;
}

export interface InputCustomProps {
  isFixed?: boolean;
  value: string | number;
  readOnly?: boolean;
}

export interface InputStylePropsWithTheme extends InputStyleProps {
  theme: Theme;
}

export type InputOptionProps = InputStyleProps & InputCustomProps;

export type InputProps = React.ComponentProps<'input'> & InputOptionProps;
