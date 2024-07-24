export interface ExpenseItemProps {
  name: string;
  price: number;
}

export type ExpenseListProps = {
  expenseList: ExpenseItemProps[];
};
