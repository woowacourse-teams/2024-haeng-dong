import {useToast} from '@hooks/useToast/useToast';

import Toast from './Toast';

const ToastContainer = () => {
  const {currentToast, closeToast} = useToast();

  return <>{currentToast && <Toast onClose={closeToast} {...currentToast.options} message={currentToast.message} />}</>;
};

export default ToastContainer;
