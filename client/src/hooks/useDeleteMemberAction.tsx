import type {MemberAction} from 'types/serviceType';

import {useState} from 'react';

import {useToast} from '@components/Toast/ToastProvider';
import {requestDeleteMemberAction} from '@apis/request/member';

import useEventId from '@hooks/useEventId';
import {useStepList} from '@hooks/useStepList';

const useDeleteMemberAction = (
  memberActionList: MemberAction[],
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const {stepList, refreshStepList} = useStepList();
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
    setIsBottomSheetOpened(false);
  };

  const addDeleteMemberAction = (memberAction: MemberAction) => {
    if (!memberActionList.includes(memberAction)) {
      showToast({
        isClickToClose: true,
        showingTime: 3000,
        message: '이미 삭제된 인원입니다.',
        type: 'error',
        bottom: '160px',
      });
      return;
    }

    if (isExistSameMemberFromAfterStep(memberAction)) {
      showToast({
        isClickToClose: true,
        showingTime: 3000,
        message: `이후의 ${memberAction.name}가 사라져요`,
        type: 'error',
        position: 'top',
        top: '30px',
        style: {
          zIndex: 9000,
        },
      });
    }

    setAliveActionList(prev => prev.filter(aliveMember => aliveMember.actionId !== memberAction.actionId));
  };

  // 현재 선택된 액션의 인덱스를 구해서 뒤의 동일인물의 액션이 있는지를 파악하는 기능
  const isExistSameMemberFromAfterStep = (memberAction: MemberAction) => {
    const memberActionList = stepList
      .filter(step => step.type !== 'BILL')
      .map(({actions}) => actions)
      .flat();
    const currentActionIndex = memberActionList.findIndex(action => action.actionId === memberAction.actionId);
    const memberActionListAfterCurrentAction = memberActionList.slice(Math.max(currentActionIndex - 1, 0));
    const memberNameList = memberActionListAfterCurrentAction.map(({name}) => name);

    return memberNameList.filter(member => member === memberAction.name).length >= 2;
  };

  return {aliveActionList, deleteMemberActionList, addDeleteMemberAction};
};

export default useDeleteMemberAction;
