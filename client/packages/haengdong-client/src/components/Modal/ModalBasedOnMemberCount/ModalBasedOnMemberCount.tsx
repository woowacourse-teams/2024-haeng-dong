import {SetAllMemberListModal, SetInitialMemberListModal, SetActionListModal} from '@components/Modal/index';

interface ModalBasedOnMemberCountProps {
  allMemberList: string[];
  isOpenBottomSheet: boolean;
  isOpenAllMemberListButton: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBasedOnMemberCount = ({
  allMemberList,
  isOpenBottomSheet,
  isOpenAllMemberListButton,
  setIsOpenBottomSheet,
  setIsOpenAllMemberListButton,
}: ModalBasedOnMemberCountProps) => {
  if (isOpenAllMemberListButton) {
    return (
      <SetAllMemberListModal
        allMemberList={allMemberList}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenAllMemberListButton={setIsOpenAllMemberListButton}
      />
    );
  }
  switch (allMemberList.length) {
    case 0:
      return (
        <SetInitialMemberListModal setIsOpenBottomSheet={setIsOpenBottomSheet} isOpenBottomSheet={isOpenBottomSheet} />
      );

    default:
      return <SetActionListModal setIsOpenBottomSheet={setIsOpenBottomSheet} isOpenBottomSheet={isOpenBottomSheet} />;
  }
};

export default ModalBasedOnMemberCount;
