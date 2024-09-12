import {Theme} from '@components/Design/theme/theme.type';

export interface DepositToggleStyleProps {
  isDeposit: boolean;
}

export interface DepositToggleCustomProps {
  isDeposit: boolean;
  onToggle: () => void;
}

export interface DepositToggleStylePropsWithTheme extends DepositToggleStyleProps {
  theme: Theme;
}

export type DepositToggleOptionProps = DepositToggleStyleProps & DepositToggleCustomProps;

export type DepositToggleProps = React.ComponentProps<'div'> & DepositToggleOptionProps;
