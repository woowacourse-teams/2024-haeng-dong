import {http, HttpResponse, PathParams} from 'msw';

import {AllMembers, Members} from 'types/serviceType';

import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';

import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';
import {memberData} from '@mocks/sharedState';

export const memberHandler = [
  // POST /api/eventId/members (requestPostMember)
  http.post<PathParams, {members: {name: string}[]}>(
    `${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/members`,
    async ({request}) => {
      const {members: newMembers} = await request.json();
      const addedMembers = newMembers.map((member, index) => ({
        id: memberData.members.length + index + 1,
        name: member.name,
        isDeposited: false,
      }));

      memberData.members = [...memberData.members, ...addedMembers];

      return HttpResponse.json({members: addedMembers}, {status: 201});
    },
  ),

  // DELETE /api/eventId/members/memberId (requestDeleteMember)
  http.delete(`${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/members/:memberId`, ({params}) => {
    const {memberId} = params;
    memberData.members = memberData.members.filter(member => member.id !== Number(memberId));
    return HttpResponse.json({status: 200});
  }),

  // PUT /api/eventId/members (requestPutMember)
  http.put<PathParams, {members: {id: number; name: string; isDeposited: boolean}[]}>(
    `${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/members`,
    async ({request}) => {
      const {members: updatedMembers} = await request.json();

      memberData.members = memberData.members.map(member => {
        const updatedMember = updatedMembers.find(m => m.id === member.id);
        return updatedMember ? {...member, ...updatedMember} : member;
      });

      return HttpResponse.json({status: 200});
    },
  ),

  // GET /api/eventId/members/current (requestGetCurrentMember)
  http.get(`${MOCK_API_PREFIX}${MEMBER_API_PREFIX}/:eventId/members/current`, () => {
    const currentMembers: Members = {
      members: memberData.members.map(({id, name}) => ({id, name})),
    };
    return HttpResponse.json(currentMembers);
  }),

  // GET /api/eventId/members (requestGetAllMember)
  http.get(`${MOCK_API_PREFIX}${MEMBER_API_PREFIX}/:eventId/members`, () => {
    return HttpResponse.json(memberData);
  }),
];
