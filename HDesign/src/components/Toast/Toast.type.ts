export type ToastPosition = 'bottom' | 'top';

export interface ToastStyleProps {
  bottom?: string;
  top?: string;
}

export interface ToastOptionProps {
  showingTime?: number;
  alwaysShow?: boolean;
  position?: ToastPosition;
}

export interface ToastRequiredProps {
  message: string;
}

export type ToastProps = React.ComponentProps<'div'> & ToastStyleProps & ToastOptionProps & ToastRequiredProps;
