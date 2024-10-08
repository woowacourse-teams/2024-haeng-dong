import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX} from '@apis/endpointPrefix';
import {requestPostWithoutResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export interface RequestPostImages {
  formData: FormData;
}

export const requestPostImages = async ({eventId, formData}: WithEventId<RequestPostImages>) => {
  return await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/images`,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: formData,
  });
};
