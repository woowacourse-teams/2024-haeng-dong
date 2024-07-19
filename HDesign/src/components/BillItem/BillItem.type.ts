export interface BillItemStyleProps {}

export interface BillItemCustomProps {
  name?: string;
  price?: number;
  hasDragHandle?: boolean;
}

export type BillItemOptionProps = BillItemStyleProps & BillItemCustomProps;

export type BillItemProps = React.ComponentProps<'div'> & BillItemOptionProps;
