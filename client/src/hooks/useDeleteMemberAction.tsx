import type {BillStep, MemberAction, MemberStep} from 'types/serviceType';

import {useEffect, useState} from 'react';

import {useToast} from '@components/Toast/ToastProvider';

import useGetStepList from './useRequestGetStepList';
import useRequestDeleteMemberAction from './useRequestDeleteMemberAction';

const useDeleteMemberAction = (
  memberActionList: MemberAction[],
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // const {stepList, refreshStepList} = useStepList();
  const {data} = useGetStepList();
  const stepList = data ?? ([] as (MemberStep | BillStep)[]);
  const [aliveActionList, setAliveActionList] = useState<MemberAction[]>(memberActionList);
  const {showToast} = useToast();

  const {
    mutate: requestDeleteMemberAction,
    isSuccess: isSuccessDeleteMemberAction,
    isError: isErrorDeleteMemberAction,
  } = useRequestDeleteMemberAction();

  const deleteMemberAction = async (actionId: number) => {
    requestDeleteMemberAction(
      {actionId},
      {
        onError: () => {
          setAliveActionList(memberActionList);
        },
      },
    );
    setIsBottomSheetOpened(false);
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
