export type ToastPosition = 'bottom' | 'top';
export type ToastType = 'error' | 'confirm' | 'none';

export interface ToastStyleProps {
  bottom?: string;
  top?: string;
}

export interface ToastOptionProps {
  position?: ToastPosition;
  type?: ToastType;
  onUndo?: () => void;
  isClickToClose?: boolean;
  onClose?: () => void;
  showingTime?: number;
}

export interface ToastRequiredProps {
  message: string;
}

export type ToastProps = React.ComponentProps<'div'> & ToastStyleProps & ToastOptionProps & ToastRequiredProps;
