import type {BillStep, MemberAction, MemberStep} from 'types/serviceType';

import useEventId from '@hooks/useEventId/useEventId';
import {requestDeleteMemberAction} from '@apis/request/member';

interface UseMemberActionProps {
  stepList: Array<BillStep | MemberStep>;
  refreshStepList: () => Promise<void>;
}

const useMemberAction = ({stepList, refreshStepList}: UseMemberActionProps) => {
  const {eventId} = useEventId();
  const memberActions = stepList.filter(step => step.type !== 'BILL').flatMap(step => step.actions);

  const hasNextMemberAction = (name: string, sequence: number) => {
    return memberActions.find(action => action.name === name && action.sequence > sequence) !== undefined;
  };

  const deleteMember = async (action: MemberAction) => {
    if (hasNextMemberAction(action.name, action.sequence)) {
      if (!window.confirm('다음 인원 액션이 존재합니다. 같이 지우시겠습니까?')) {
        return;
      }
    }
    await requestDeleteMemberAction({eventId, actionId: action.actionId});
    refreshStepList();
  };

  return {deleteMember};
};

export default useMemberAction;
