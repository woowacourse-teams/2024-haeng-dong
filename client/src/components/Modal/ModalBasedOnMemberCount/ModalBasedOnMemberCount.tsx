import {SetAllMemberListModal, SetInitialMemberListModal, SetActionListModal} from '@components/Modal/index';

interface ModalBasedOnMemberCountProps {
  memberNameList: string[];
  isOpenBottomSheet: boolean;
  isOpenAllMemberListButton: boolean;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBasedOnMemberCount = ({
  memberNameList,
  isOpenBottomSheet,
  isOpenAllMemberListButton,
  setOrder,
  setIsOpenBottomSheet,
  setIsOpenAllMemberListButton,
}: ModalBasedOnMemberCountProps) => {
  if (isOpenAllMemberListButton) {
    return (
      <SetAllMemberListModal
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenAllMemberListButton={setIsOpenAllMemberListButton}
      />
    );
  }
  switch (memberNameList.length) {
    case 0:
      return (
        <SetInitialMemberListModal setIsOpenBottomSheet={setIsOpenBottomSheet} isOpenBottomSheet={isOpenBottomSheet} />
      );

    default:
      return (
        <SetActionListModal
          setOrder={setOrder}
          setIsOpenBottomSheet={setIsOpenBottomSheet}
          isOpenBottomSheet={isOpenBottomSheet}
        />
      );
  }
};

export default ModalBasedOnMemberCount;
