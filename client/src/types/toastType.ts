import {Theme} from '@components/Design/theme/theme.type';

export type ToastPosition = 'bottom' | 'top';

export type ToastOptions = {
  showingTime?: number;
  isAutoClosed?: boolean;
  isCloseOnClick?: boolean;
  position?: ToastPosition;
  bottom?: string;
  top?: string;
  theme?: Theme;
};

export type ToastMessage = string;

export type ToastArgs = {
  message: ToastMessage;
  options: ToastOptions;
};
