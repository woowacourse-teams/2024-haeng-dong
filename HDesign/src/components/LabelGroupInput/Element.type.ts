export interface ElementStyleProps {}

export interface ElementCustomProps {
  key: string;
  isError?: boolean;
}

export type ElementOptionProps = ElementStyleProps & ElementCustomProps;

export type ElementProps = React.ComponentProps<'input'> & ElementOptionProps;
