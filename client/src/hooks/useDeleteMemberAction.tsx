import type {MemberAction} from 'types/serviceType';

import {useState} from 'react';

import {requestDeleteMemberAction} from '@apis/request/member';

import {useStepList} from '@hooks/useStepList';

import {useFetch} from '@apis/useFetch';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const useDeleteMemberAction = (
  memberActionList: MemberAction[],
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const {stepList, refreshStepList} = useStepList();
  const [aliveActionList, setAliveActionList] = useState<MemberAction[]>(memberActionList);
  const eventId = getEventIdByUrl();
  const {fetch} = useFetch();

  const deleteMemberAction = async (actionId: number) => {
    await fetch({
      queryFunction: () => requestDeleteMemberAction({actionId, eventId}),
      onSuccess: () => {
        refreshStepList();
        setIsBottomSheetOpened(false);
      },
      onError: () => {
        setAliveActionList(memberActionList);
      },
    });
  };

  // TODO: (@cookie: 추후에 반복문으로 delete하는 것이 아니라 한 번에 모아서 delete 처리하기 (backend에 문의))
  const deleteMemberActionList = async () => {
    const aliveActionIdList = aliveActionList.map(({actionId}) => actionId);
    const deleteMemberActionIdList = memberActionList
      .filter(({actionId}) => !aliveActionIdList.includes(actionId))
      .map(({actionId}) => actionId);

    for (const deleteMemberActionId of deleteMemberActionIdList) {
      await deleteMemberAction(deleteMemberActionId);
    }
  };

  const addDeleteMemberAction = (memberAction: MemberAction) => {
    setAliveActionList(prev => prev.filter(aliveMember => aliveMember.actionId !== memberAction.actionId));
  };

  // 현재 선택된 액션의 인덱스를 구해서 뒤의 동일인물의 액션이 있는지를 파악하는 기능
  // 논의 후 제거 여부 결정
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

  return {aliveActionList, deleteMemberActionList, addDeleteMemberAction, isExistSameMemberFromAfterStep};
};

export default useDeleteMemberAction;
