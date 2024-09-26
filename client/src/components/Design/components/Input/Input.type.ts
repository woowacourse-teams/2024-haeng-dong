import {Theme} from '@theme/theme.type';

export interface InputStyleProps {
  theme?: Theme;
  isAlwaysOnBorder?: boolean;
}

export type InputType = 'input' | 'search';

export interface InputCustomProps {
  inputType?: InputType;
  isError?: boolean;
}

export type InputOptionProps = InputStyleProps & InputCustomProps;

export type InputProps = React.ComponentProps<'input'> & InputOptionProps;
