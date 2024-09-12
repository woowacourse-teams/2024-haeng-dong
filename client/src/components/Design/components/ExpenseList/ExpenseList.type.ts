export interface ExpenseItemCustomProps {
  name: string;
  price: number;
  onBankButtonClick: (price: number) => void;
}

export type ExpenseItemProps = React.ComponentProps<'button'> & ExpenseItemCustomProps;

export type ExpenseListProps = {
  expenseList: ExpenseItemProps[];
};
