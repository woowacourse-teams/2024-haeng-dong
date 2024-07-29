export interface ExpenseItemCustomProps {
  name: string;
  price: number;
}

export type ExpenseItemProps = React.ComponentProps<'button'> & ExpenseItemCustomProps;

export type ExpenseListProps = {
  expenseList: ExpenseItemProps[];
};
