export interface ExpenseItemCustomProps {
  name: string;
  price: number;
  onBankButtonClick: () => void;
  clipboardText: string;
}

export type ExpenseItemProps = React.ComponentProps<'div'> & ExpenseItemCustomProps;

export type ExpenseListProps = {
  expenseList: ExpenseItemProps[];
};
