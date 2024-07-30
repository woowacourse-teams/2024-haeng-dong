import {useState, useEffect} from 'react';

interface UseToastProps {
  message: string;
  showingTime?: number;
  alwaysShow?: boolean;
}

const useToast = ({message, showingTime = 3000, alwaysShow = false}: UseToastProps) => {
  const [isShow, setIsShow] = useState(false);

  const showToast = () => {
    setIsShow(true);
  };

  const untilShowingTimeAndDisappear = () => {
    setTimeout(() => {
      setIsShow(false);
    }, showingTime);
  };

  useEffect(() => {
    showToast();
    if (!alwaysShow) {
      untilShowingTimeAndDisappear();
    }
  }, [message]);

  return {
    isShow,
  };
};

export default useToast;
