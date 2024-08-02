import type {MemberAction} from 'types/serviceType';

import {Text, Input, BottomSheet, Button, Flex} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import useMemberAction from '@hooks/useStepList/useMemberAction';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './ComeInMember.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  actions: MemberAction[];
}

const ComeInMember = ({openBottomSheet, setOpenBottomSheet, actions}: SetInitialParticipantsProps) => {
  const {refreshStepList, stepList} = useStepList();
  const {deleteMember} = useMemberAction({stepList, refreshStepList});

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
