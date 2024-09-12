export interface DepositToggleStyleProps {}

export interface DepositToggleCustomProps {
  isDeposit: boolean;
  onToggle: () => void;
}

export type DepositToggleOptionProps = DepositToggleStyleProps & DepositToggleCustomProps;

export type DepositToggleProps = React.ComponentProps<'div'> & DepositToggleOptionProps;
