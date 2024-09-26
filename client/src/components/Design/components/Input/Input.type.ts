import {Theme} from '@theme/theme.type';

export interface InputStyleProps {
  theme?: Theme;
  isError?: boolean;
}

export type InputType = 'input' | 'search';

export interface InputCustomProps {
  inputType?: InputType;
  labelText?: string;
  errorText?: string | null;
  onDelete?: () => void;
}

export type InputOptionProps = InputStyleProps & InputCustomProps;

export type InputProps = React.ComponentProps<'input'> & InputOptionProps;
