export interface DepositCheckStyleProps {
  isCheck: boolean;
}

export interface DepositCheckCustomProps {
  isCheck: boolean;
}

export type DepositCheckOptionProps = DepositCheckStyleProps & DepositCheckCustomProps;

export type DepositCheckProps = React.ComponentProps<'div'> & DepositCheckOptionProps;
