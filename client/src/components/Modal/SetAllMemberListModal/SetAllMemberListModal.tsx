import {BottomSheet} from 'haengdong-design';

interface SetAllMemberListModalProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickAllMemberListButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetAllMemberListModal = ({
  openBottomSheet,
  setOpenBottomSheet,
  setIsClickAllMemberListButton,
}: SetAllMemberListModalProps) => {
  const handleCloseAllMemberListModal = () => {
    setIsClickAllMemberListButton(prev => !prev);
    setOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={openBottomSheet} onClose={handleCloseAllMemberListModal}>
      test
    </BottomSheet>
  );
};

export default SetAllMemberListModal;
