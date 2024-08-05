import type {MemberAction} from 'types/serviceType';

import {useState} from 'react';
import {useToast} from 'haengdong-design';

import useEventId from '@hooks/useEventId/useEventId';
import {requestDeleteMemberAction} from '@apis/request/member';

interface UseDeleteMemberActionProps {
  memberActionList: MemberAction[];
  refreshStepList: () => Promise<void>;
}

const useDeleteMemberAction = ({memberActionList, refreshStepList}: UseDeleteMemberActionProps) => {
  const [aliveActionList, setAliveActionList] = useState<MemberAction[]>(memberActionList);
  const {eventId} = useEventId();
  const {showToast} = useToast();

  const deleteMemberAction = async (actionId: number) => {
    try {
      await requestDeleteMemberAction({actionId, eventId});
    } catch (error) {
      // TODO: (@cookie): 에러처리 백엔드에 맞게 나중에 메시지 설정
      // 원래는 백엔드가 만들어준 에러토큰을 이용해서 나눠서 보여주는 것이 맞지만 우리가 에러처리를 아무곳에서도 하지않아서 후추
      showToast({
        isClickToClose: true,
        message: '멤버 삭제가 되지 않았어요 :(',
        showingTime: 3000,
        type: 'error',
        style: {
          zIndex: '900', // TODO: (@weadie) 토스트 zIndex고쳐지면 여기 수정해야됨
        },
        bottom: '160px',
      });
    }
  };

  const deleteMemberActionList = async () => {
    const aliveActionIdList = aliveActionList.map(({actionId}) => actionId);
    const deleteMemberActionIdList = memberActionList
      .filter(({actionId}) => !aliveActionIdList.includes(actionId))
      .map(({actionId}) => actionId);

    for (const deleteMemberActionId of deleteMemberActionIdList) {
      await deleteMemberAction(deleteMemberActionId);
    }

    refreshStepList();
  };

  const addDeleteMemberAction = (memberAction: MemberAction) => {
    if (!memberActionList.includes(memberAction)) {
      showToast({
        isClickToClose: true,
        showingTime: 3000,
        message: '이미 삭제된 인원입니다.',
        type: 'error',
        style: {
          zIndex: '900', // TODO: (@weadie) 토스트 zIndex고쳐지면 여기 수정해야됨
        },
        bottom: '160px',
      });
      return;
    }

    setAliveActionList(prev => prev.filter(aliveMember => aliveMember.actionId !== memberAction.actionId));
  };

  // 같은 사람의 액션이 뒤에 존재하는지를 판단을 할 수 있어야한다.
  // 서버에서 확인해서 뒤의 동일 인원의 액션을 지워주긴 하지만 그 상황을 삭제를 할 때 사용자에게 공지를 해줘야 할 필요가 있기 때문
  // 하지만 지금 memberActionList의 경우 현재 step에 있는 member만을 가지고 있으므로 이를 파악할 수 없는 문제가 있다.
  // 이를 파악하려면 useStepList에서 전체 step 정보를 들고와서 뒤의 동일 인원의 액션을 찾아야한다.

  return {aliveActionList, deleteMemberActionList, addDeleteMemberAction};
};

export default useDeleteMemberAction;
