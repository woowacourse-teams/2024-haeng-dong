export interface LabelGroupInputStyleProps {}

export interface LabelGroupInputCustomProps {
  values: string[];
  labelText: string;
  placeHolders?: string[];
  errorText?: string;
  errorIndexList?: number[];
}

export type LabelGroupInputOptionProps = LabelGroupInputStyleProps & LabelGroupInputCustomProps;

export type LabelGroupInputProps = React.ComponentProps<'input'> & LabelGroupInputOptionProps;
