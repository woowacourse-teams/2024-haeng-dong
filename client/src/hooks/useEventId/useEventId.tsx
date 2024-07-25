import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

const useEventId = () => {
  const [eventId, setEventId] = useState('');
  const location = useLocation();

  const extractIdFromUrl = (url: string) => {
    const regex = /\/event\/([a-zA-Z0-9-]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const curEventId = extractIdFromUrl(location.pathname) ?? '';

  useEffect(() => {
    setEventId(curEventId);
  }, []);

  return {
    eventId,
  };
};

export default useEventId;
