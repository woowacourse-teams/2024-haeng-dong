export interface LabelInputStyleProps {}

export interface LabelInputCustomProps {
  value: string;
  labelText: string;
  errorText?: string;
  isError?: boolean;
}

export type LabelInputOptionProps = LabelInputCustomProps & LabelInputCustomProps;

export type LabelInputProps = React.ComponentProps<'input'> & LabelInputOptionProps;
