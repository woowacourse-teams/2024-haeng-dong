import {Report} from 'types/serviceType';

export type ExpenseItemCustomProps = Report & {
  onBankButtonClick: () => void;
  clipboardText: string;
};

export type ExpenseItemProps = React.ComponentProps<'div'> & ExpenseItemCustomProps;

export type ExpenseListProps = {
  name: string;
  onSearch: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  expenseList: ExpenseItemProps[];
};
