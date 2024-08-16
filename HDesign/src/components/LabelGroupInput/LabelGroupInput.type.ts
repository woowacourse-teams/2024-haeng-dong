export interface LabelGroupInputStyleProps {}

export interface LabelGroupInputCustomProps {
  labelText: string;
  errorText: string | null;
}

export type LabelGroupInputOptionProps = LabelGroupInputStyleProps & LabelGroupInputCustomProps;

export type LabelGroupInputProps = React.ComponentProps<'input'> & LabelGroupInputOptionProps;
