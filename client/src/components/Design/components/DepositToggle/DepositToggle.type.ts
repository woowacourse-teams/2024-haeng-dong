export interface DepositToggleStyleProps {}

export interface DepositToggleCustomProps {}

export type DepositToggleOptionProps = DepositToggleStyleProps & DepositToggleCustomProps;

export type DepositToggleProps = React.ComponentProps<'div'> & DepositToggleOptionProps;
