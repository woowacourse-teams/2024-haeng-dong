import {BottomSheet, FixedButton} from 'haengdong-design';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetOutMember = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  return (
    <BottomSheet isOpened={openBottomSheet} onChangeClose={() => setOpenBottomSheet(false)}>
      망쵸모달 나감 모달
      <FixedButton onDeleteClick={() => alert('아아아앙')}>안녕</FixedButton>
    </BottomSheet>
  );
};

export default GetOutMember;
