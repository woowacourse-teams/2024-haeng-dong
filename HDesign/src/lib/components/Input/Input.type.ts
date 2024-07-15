import {Theme} from '../../theme/theme.type';

export interface InputStyleProps {
  theme?: Theme;
}

export interface InputCustomProps {}

export type InputOptionProps = InputStyleProps & InputCustomProps;

export type InputProps = React.ComponentProps<'input'> & InputOptionProps;
