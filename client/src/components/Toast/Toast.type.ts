import {ToastMessage, ToastOptions} from 'types/toastType';

export type ToastType = 'error' | 'confirm' | 'none';

export type ToastOptionProps = ToastOptions & {
  type?: ToastType;
  onClose?: () => void;
  onUndo?: () => void;
};

export type ToastRequiredProps = {
  message: ToastMessage;
};

export type ToastProps = React.ComponentProps<'div'> & ToastOptionProps & ToastRequiredProps;
