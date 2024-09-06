import type {MemberReport} from 'types/serviceType';

import {BottomSheet, FixedButton, Flex, Text} from '@HDesign/index';

import {bottomSheetStyle} from './MemberListInBillStep.style';

type MemberListInBillStepProps = {
  stepName: string;
  memberList: MemberReport[];
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const MemberListInBillStep = ({
  stepName,
  memberList,
  isOpenBottomSheet,
  setIsOpenBottomSheet,
}: MemberListInBillStepProps) => {
  const closeModal = () => setIsOpenBottomSheet(false);

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={closeModal}>
      <div css={bottomSheetStyle}>
        <Flex justifyContent="spaceBetween" alignItems="center" padding="0 0.5rem">
          <Text size="bodyBold" textColor="onTertiary">{`${stepName} 참석자`}</Text>
          <Text size="bodyBold" textColor="gray">{`총 ${memberList.length}명`}</Text>
        </Flex>
        <Flex flexDirection="column" gap="0.5rem" padding="0 0.5rem">
          <ul>
            {memberList.map(member => (
              <li key={member.name}>
                <Flex padding="0.5rem 1rem" width="100%" justifyContent="spaceBetween">
                  <Text size="bodyBold" textColor="onTertiary">
                    {member.name}
                  </Text>
                  <Text size="body" textColor="black">
                    {`${member.price.toLocaleString('ko-kr')} 원`}
                  </Text>
                </Flex>
              </li>
            ))}
          </ul>
        </Flex>
      </div>
      <FixedButton variants="tertiary" onClick={closeModal}>
        닫기
      </FixedButton>
    </BottomSheet>
  );
};

export default MemberListInBillStep;
