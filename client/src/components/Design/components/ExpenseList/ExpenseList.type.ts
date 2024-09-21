export interface ExpenseItemCustomProps {
  name: string;
  price: number;
  onBankButtonClick: () => void;
  clipboardText: string;
}

export type ExpenseItemProps = React.ComponentProps<'div'> & ExpenseItemCustomProps;

export type ExpenseListProps = {
  name: string;
  onSearch: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  expenseList: ExpenseItemProps[];
};
