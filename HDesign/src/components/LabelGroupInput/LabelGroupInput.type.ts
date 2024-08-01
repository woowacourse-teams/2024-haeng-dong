export interface LabelGroupInputStyleProps {}

export interface LabelGroupInputCustomProps {
  labelText: string;
  errorText?: string;
}

export type LabelGroupInputOptionProps = LabelGroupInputStyleProps & LabelGroupInputCustomProps;

export type LabelGroupInputProps = React.ComponentProps<'input'> & LabelGroupInputOptionProps;
