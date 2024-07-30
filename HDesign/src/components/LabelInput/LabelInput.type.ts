import {InputProps} from '../Input/Input.type';

export interface LabelInputStyleProps {}

export interface ButtonCustomProps {
  labelText: string;
  errorText?: string;
  children?: React.ReactElement<InputProps>[] | React.ReactElement<InputProps>;
}

export type LabelInputOptionProps = LabelInputStyleProps & ButtonCustomProps;

export type LabelInputProps = React.ComponentProps<'div'> & LabelInputOptionProps;
