export interface LabelInputStyleProps {}

export interface LabelInputCustomProps {
  labelText: string;
  errorText?: string;
  isError?: boolean;
  autoFocus: boolean;
}

export type LabelInputOptionProps = LabelInputCustomProps & LabelInputCustomProps;

export type LabelInputProps = React.ComponentProps<'input'> & LabelInputOptionProps;
