export interface DepositCheckStyleProps {
  isDeposited: boolean;
}

export interface DepositCheckCustomProps {
  isDeposited: boolean;
}

export type DepositCheckOptionProps = DepositCheckStyleProps & DepositCheckCustomProps;

export type DepositCheckProps = React.ComponentProps<'div'> & DepositCheckOptionProps;
