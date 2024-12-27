import {useContext} from 'react';

import {EventDataContext} from '@components/Loader/EventData/EventDataProvider';

const useEventDataContext = () => {
  const value = useContext(EventDataContext);

  if (!value) {
    throw new Error('EventDataProvider와 함께 사용해주세요.');
  }

  return value;
};

export default useEventDataContext;
