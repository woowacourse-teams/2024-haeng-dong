import {Report} from 'types/serviceType';

export type ExpenseItemCustomProps = Report & {
  onSendButtonClick: (amount: number) => void;
  onCopy: (amount: number) => Promise<void>;
  canSendBank: boolean;
};

export type ExpenseItemProps = Omit<React.ComponentProps<'div'>, 'onCopy'> & ExpenseItemCustomProps;

export type ExpenseListProps = {
  memberName: string;
  onSearch: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  expenseList: ExpenseItemProps[];
};
