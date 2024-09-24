import {ToastMessage, ToastOptions} from 'types/toastType';

import toastEventManager from './toastEventManager';
import {TOAST_EVENT} from './toastEventManager.type';

const showToast = (message: ToastMessage, options: ToastOptions) => {
  return toastEventManager.trigger(TOAST_EVENT.show, message, options);
};

// toast('안녕') 처럼도 사용할 수 있도록
const toast = (message: ToastMessage, options: ToastOptions = {}) => {
  return showToast(message, options);
};

toast.error = (message: ToastMessage, options: ToastOptions = {}) => showToast(message, options);
toast.confirm = (message: ToastMessage, options: ToastOptions = {}) => showToast(message, options);
toast.none = (message: ToastMessage, options: ToastOptions = {}) => showToast(message, options);

export default toast;
