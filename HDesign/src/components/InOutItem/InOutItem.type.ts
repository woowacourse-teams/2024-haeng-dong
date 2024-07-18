export type InOutType = 'in' | 'out';

export interface InOutItemStyleProps {}

export interface InOutItemCustomProps {
  names?: string[];
  inOutType?: InOutType;
  hasDragHandle?: boolean;
}

export type InOutItemOptionProps = InOutItemStyleProps & InOutItemCustomProps;

export type InOutItemProps = React.ComponentProps<'div'> & InOutItemOptionProps;
