import {RequestPostNewEvent, ResponsePostNewEvent, requestPostNewEvent} from '@apis/request/event';

import {useFetch} from '@apis/useFetch';

const useEvent = () => {
  const {fetch} = useFetch();

  const createNewEvent = async ({eventName, password}: RequestPostNewEvent) => {
    return await fetch<ResponsePostNewEvent>({queryFunction: () => requestPostNewEvent({eventName, password})});
  };

  return {createNewEvent};
};

export default useEvent;
