import {ResponsePostNewEvent, requestPostNewEvent} from '@apis/request/event';

import {useFetch} from '@apis/useFetch';

const useEvent = () => {
  const {fetch} = useFetch();

  const createNewEvent = async ({eventName}: {eventName: string}) => {
    return await fetch<ResponsePostNewEvent>(() => requestPostNewEvent({eventName}));
  };

  return {createNewEvent};
};

export default useEvent;
