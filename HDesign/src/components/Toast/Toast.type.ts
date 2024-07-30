export interface ToastStyleProps {
  top?: number;
}

export interface ToastCustomProps {
  showingTime?: number;
  alwaysShow?: boolean;
}

export interface ToastRequiredProps {
  message: string;
}

export type ToastOptionProps = ToastStyleProps & ToastCustomProps;

export type ToastProps = React.ComponentProps<'aside'> & ToastOptionProps & ToastRequiredProps;
