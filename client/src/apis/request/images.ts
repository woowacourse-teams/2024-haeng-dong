import {EventId, Images} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete, requestGet, requestPostWithoutResponse} from '@apis/request';
import {WithEventId} from '@apis/withId.type';

export interface RequestPostImages {
  formData: FormData;
}

export const requestPostImages = async ({eventId, formData}: WithEventId<RequestPostImages>) => {
  await requestPostWithoutResponse({endpoint: `${ADMIN_API_PREFIX}/${eventId}/images`, body: formData});
};

export const requestGetImages = async ({eventId}: WithEventId) => {
  return await requestGet<Images>({
    baseUrl: BASE_URL.HD,
    endpoint: `${MEMBER_API_PREFIX}/${eventId}/images`,
  });
};

export interface RequestDeleteImage {
  imageId: number;
}

export const requestDeleteImage = async ({eventId, imageId}: WithEventId<RequestDeleteImage>) => {
  return await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/images/${imageId}`,
  });
};
