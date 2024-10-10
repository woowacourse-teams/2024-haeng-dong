import {EventId, Images} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete, requestGet, requestPostWithoutResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export interface RequestPostImages {
  formData: FormData;
}

export const requestPostImages = async ({eventId, formData}: WithEventId<RequestPostImages>) => {
  // return await requestPostWithoutResponse({
  //   baseUrl: BASE_URL.HD,
  //   endpoint: `${ADMIN_API_PREFIX}/${eventId}/images`,
  //   headers: {
  //     'Content-Type': '',
  //   },
  //   body: formData,
  // });

  // TODO: (@todari): 기존의 request 방식들은 기본적으로
  // header를 Content-Type : application/json 으로 보내주고 있음
  // multipart/form-data 요청을 보내기 위해선 header Content-Type을 빈 객체로 전달해야 함
  try {
    await fetch(`${BASE_URL.HD}${ADMIN_API_PREFIX}/${eventId}/image`, {
      credentials: 'include',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    throw error;
  }
};

export const requestGetImages = async ({eventId}: WithEventId) => {
  return await requestGet<Images>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/images`,
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
