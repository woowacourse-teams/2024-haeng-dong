import {useState, useEffect} from 'react';

interface UseToastProps {
  message: string;
  showingTime?: number;
  alwaysShow?: boolean;
}

const useToast = ({message, showingTime = 3000, alwaysShow = false}: UseToastProps) => {
  const [show, setShow] = useState(false);

  const showToast = () => {
    setShow(true);
  };

  const untilShowingTimeAndDisappear = () => {
    setTimeout(() => {
      setShow(false);
    }, showingTime);
  };

  useEffect(() => {
    showToast();
    if (!alwaysShow) {
      untilShowingTimeAndDisappear();
    }
  }, [message]);

  return {
    show,
  };
};

export default useToast;
