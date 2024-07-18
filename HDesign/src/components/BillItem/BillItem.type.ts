export interface BillItemStyleProps {}

export interface BillItemCustomProps {
  name?: string;
  price?: number;
}

export type BillItemOptionProps = BillItemStyleProps & BillItemCustomProps;

export type BillItemProps = React.ComponentProps<'div'> & BillItemOptionProps;
