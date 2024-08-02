import type {MemberAction} from 'types/serviceType';

import {Text, Input, BottomSheet, Button, Flex} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import {requestDeleteAction} from '@apis/request/action';
import useEventId from '@hooks/useEventId/useEventId';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './ComeInMember.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  actions: MemberAction[];
}

const ComeInMember = ({openBottomSheet, setOpenBottomSheet, actions}: SetInitialParticipantsProps) => {
  const {refreshStepList, stepList} = useStepList();
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
    await requestDeleteAction({eventId, actionId: action.actionId});
    refreshStepList();
  };

  return (
    <BottomSheet isOpened={openBottomSheet} onChangeClose={() => setOpenBottomSheet(false)}>
      <div css={setInitialParticipantsStyle}>
        <Text size="bodyBold">들어온 인원 수정하기</Text>
        <div css={setInitialParticipantsInputGroupStyle}>
          {actions.map(action => (
            <Flex flexDirection="row" width="100%">
              <div style={{flexGrow: 1}}>
                <Input disabled key={`${action.actionId}`} type="text" style={{flexGrow: 1}} value={action.name} />
              </div>
              <Button style={{width: '50px'}} onClick={() => deleteMember(action)}>
                X
              </Button>
            </Flex>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

export default ComeInMember;
