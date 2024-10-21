import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ROUTER_URLS} from '@constants/routerUrls';

const useMainSectionBackgroundScroll = (trackStartCreateEvent: () => void) => {
  const navigate = useNavigate();

  const handleClick = () => {
    trackStartCreateEvent();
    navigate(ROUTER_URLS.createEvent);
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {isVisible, handleClick};
};

export default useMainSectionBackgroundScroll;
