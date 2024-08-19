// TODO: (@todari) useEvent는 이제 쓰지 않긴 해요...!

import {RequestPostNewEvent, ResponsePostNewEvent, requestPostNewEvent} from '@apis/request/event';
import {useFetch} from '@hooks/useFetch/useFetch';

const useEvent = () => {
  const {fetch} = useFetch();

  const createNewEvent = async ({eventName, password}: RequestPostNewEvent) => {
    return await fetch<ResponsePostNewEvent>({queryFunction: () => requestPostNewEvent({eventName, password})});
  };

  return {createNewEvent};
};

export default useEvent;
