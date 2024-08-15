import type {MemberAction, MemberType} from 'types/serviceType';

import {BottomSheet, Flex, Input, Text, IconButton, FixedButton, Icon} from 'haengdong-design';

import {useToast} from '@components/Toast/ToastProvider';

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
  const {showToast} = useToast();

  const {aliveActionList, deleteMemberActionList, addDeleteMemberAction, isExistSameMemberFromAfterStep} =
    useDeleteMemberAction(memberActionList, setIsBottomSheetOpened);

  const onDeleteIconClick = (member: MemberAction) => {
    alertSpecificCaseFromAddDeleteMember(member);
    addDeleteMemberAction(member);
  };

  // 삭제버튼 누를 때 특수한 케이스이면 토스트를 띄우는 기능
  const alertSpecificCaseFromAddDeleteMember = (memberAction: MemberAction) => {
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
  };

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <div css={bottomSheetStyle}>
        <header css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">{memberActionType === 'IN' ? '들어온' : '나간'} 인원 수정하기</Text>
          <Text size="bodyBold" textColor="gray">{`${aliveActionList.length}명`}</Text>
        </header>
        <ul css={inputGroupStyle}>
          {aliveActionList.map(member => (
            <li key={member.actionId}>
              <Flex flexDirection="row" width="100%" gap="1rem">
                <div style={{flexGrow: 1}}>
                  <Input disabled key={`${member.actionId}`} type="text" style={{flexGrow: 1}} value={member.name} />
                </div>
                <IconButton size="medium" variants="tertiary" onClick={() => onDeleteIconClick(member)}>
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
