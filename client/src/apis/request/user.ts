import {BASE_URL} from '@apis/baseUrl';
import {MEMBER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete} from '@apis/fetcher';

export const requestDeleteUser = async () => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${MEMBER_API_PREFIX}`,
  });
};
