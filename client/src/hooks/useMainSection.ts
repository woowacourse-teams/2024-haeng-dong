import {useNavigate} from 'react-router-dom';

import {ROUTER_URLS} from '@constants/routerUrls';

const useMainSection = (trackStartCreateEvent: () => void) => {
  const navigate = useNavigate();

  const handleClick = () => {
    trackStartCreateEvent();
    navigate(ROUTER_URLS.createEvent);
  };

  return {handleClick};
};

export default useMainSection;
