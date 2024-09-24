import {ToastMessage, ToastOptions} from 'types/toastType';

const TOAST_SHOW = 'TOAST_SHOW' as const;
const TOAST_CLOSE = 'TOAST_CLOSE' as const;

export const TOAST_EVENT = {
  show: TOAST_SHOW,
  close: TOAST_CLOSE,
};

export type ToastEventType = typeof TOAST_SHOW | typeof TOAST_CLOSE;

export type ToastEventCallbackMap = {
  [TOAST_SHOW]: (message: ToastMessage, options: ToastOptions) => void;
  [TOAST_CLOSE]: () => void;
};

export type AddEventHandlerArgs<K extends keyof ToastEventCallbackMap> = {
  eventType: K;
  callback: ToastEventCallbackMap[K];
};
