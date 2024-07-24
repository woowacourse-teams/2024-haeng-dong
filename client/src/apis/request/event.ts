import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet} from '@apis/fetcher';
import {StepList} from 'types/stepList';

type RequestCreateNewEvent = {
  name: string;
};

export const requestCreateNewEvent = async ({name}: RequestCreateNewEvent) => {
  // TODO: (@weadie) 뼈대만 둔 것. header값을 꺼내오는 로직이 필요하다. 또는 바디에 달라고 부탁할 수 있다.
  return await requestGet<StepList>({
    baseUrl: BASE_URL.HD,
    endpoint: TEMP_PREFIX,
    body: {name},
  });
};
