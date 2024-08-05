import type {MemberAction, MemberType} from 'types/serviceType';

import {BottomSheet, Flex, Input, Text, IconButton, FixedButton} from 'haengdong-design';

import useDeleteMemberAction from '@hooks/useDeleteMemberAction/useDeleteMemberAction';
import {useStepList} from '@hooks/useStepList/useStepList';

import {bottomSheetStyle, buttonStyle, inputGroupStyle} from './DeleteMemberActionModal.style';

type DeleteMemberActionModalProps = {
  memberActionType: MemberType;
  memberActionList: MemberAction[];
  isBottomSheetOpened: boolean;
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteMemberActionModal = ({
  memberActionType,
  memberActionList,
  isBottomSheetOpened,
  setIsBottomSheetOpened,
}: DeleteMemberActionModalProps) => {
  const {refreshStepList} = useStepList();
  const {aliveActionList, deleteMemberActionList, addDeleteMemberAction} = useDeleteMemberAction({
    memberActionList,
    refreshStepList,
  });

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <div css={bottomSheetStyle}>
        <Text size="bodyBold">{memberActionType === 'IN' ? '들어온' : '나간'} 인원 수정하기</Text>
        <ul css={inputGroupStyle}>
          {aliveActionList.map(member => (
            <li key={member.actionId}>
              <Flex flexDirection="row" width="100%" gap="1rem">
                <div style={{flexGrow: 1}}>
                  <Input disabled key={`${member.actionId}`} type="text" style={{flexGrow: 1}} value={member.name} />
                </div>
                {/* TODO: (@cookie): 삭제버튼 행동디자인에서 사용해야한다. 아직 엄서용 */}
                <div css={buttonStyle}>
                  <IconButton style={{width: '100%'}} iconType="trash" onClick={() => addDeleteMemberAction(member)} />
                </div>
              </Flex>
            </li>
          ))}
        </ul>
        <FixedButton
          variants="primary"
          children="수정 완료"
          onClick={deleteMemberActionList}
          disabled={memberActionList.length === aliveActionList.length}
        />
      </div>
    </BottomSheet>
  );
};

export default DeleteMemberActionModal;
