import {Member, MemberType} from 'types/stepList';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestUpdateMemberList = {
  memberNameList: string[];
  type: MemberType;
};

export const requestUpdateMemberList = async ({
  eventId,
  type,
  memberNameList,
}: WithEventId<RequestUpdateMemberList>) => {
  await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/members`,
    body: {
      members: memberNameList,
      status: type,
    },
  });
};
