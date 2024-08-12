import type {MemberAction, MemberType} from 'types/serviceType';

import {BottomSheet, Flex, Input, Text, IconButton, FixedButton, Icon} from 'haengdong-design';

import useDeleteMemberAction from '@hooks/useDeleteMemberAction';

import {bottomSheetHeaderStyle, bottomSheetStyle, inputGroupStyle} from './DeleteMemberActionModal.style';

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
  const {aliveActionList, deleteMemberActionList, addDeleteMemberAction} = useDeleteMemberAction(
    memberActionList,
    setIsBottomSheetOpened,
  );

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <div css={bottomSheetStyle}>
        <header css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">{memberActionType === 'IN' ? '들어온' : '나간'} 인원 수정하기</Text>
          {/* TODO: (@cookie): 텍스트 색 수정 필요 */}
          <Text size="bodyBold">{`${aliveActionList.length}명`}</Text>
        </header>
        <ul css={inputGroupStyle}>
          {aliveActionList.map(member => (
            <li key={member.actionId}>
              <Flex flexDirection="row" width="100%" gap="1rem">
                <div style={{flexGrow: 1}}>
                  <Input disabled key={`${member.actionId}`} type="text" style={{flexGrow: 1}} value={member.name} />
                </div>
                <IconButton size="medium" variants="tertiary" onClick={() => addDeleteMemberAction(member)}>
                  <Icon iconType="trash" iconColor="onTertiary" />
                </IconButton>
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
