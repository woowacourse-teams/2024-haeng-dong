export interface LabelInputStyleProps {
  isAlwaysOnLabel?: boolean;
  isAlwaysOnInputBorder?: boolean;
}

export interface LabelInputCustomProps {
  labelText: string;
  errorText: string | null;
  isError?: boolean;
  autoFocus: boolean;
}

export type LabelInputOptionProps = LabelInputCustomProps & LabelInputStyleProps;

export type LabelInputProps = React.ComponentProps<'input'> & LabelInputOptionProps;
