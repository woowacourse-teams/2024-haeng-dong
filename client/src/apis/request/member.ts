import {Member} from 'types/stepList';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestUpdateMemberList = {
  MemberList: Member[];
};

export const requestUpdateMemberList = async ({eventId, MemberList}: WithEventId<RequestUpdateMemberList>) => {
  await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/members`,
    body: {
      actions: MemberList,
    },
  });
};
