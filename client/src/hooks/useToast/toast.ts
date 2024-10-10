import {ToastMessage, ToastOptions} from 'types/toastType';
import {ToastType} from '@components/Toast/Toast.type';

import toastEventManager from './toastEventManager';
import {TOAST_EVENT} from './toastEventManager.type';

const showToast = (message: ToastMessage, options: ToastOptions, type?: ToastType) => {
  return toastEventManager.trigger(TOAST_EVENT.show, message, {...options, type});
};

// toast('안녕') 처럼도 사용할 수 있도록
const toast = (message: ToastMessage, options: ToastOptions = {}) => {
  return showToast(message, options, 'none');
};

toast.error = (message: ToastMessage, options: ToastOptions = {}) => showToast(message, options, 'error');
toast.confirm = (message: ToastMessage, options: ToastOptions = {}) => showToast(message, options, 'confirm');
toast.none = (message: ToastMessage, options: ToastOptions = {}) => showToast(message, options, 'none');

export default toast;
