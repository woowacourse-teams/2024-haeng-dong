import {Text, Input, BottomSheet, FixedButton} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';

import useDynamicInput from '@hooks/useDynamicAdditionalInput';

import {setInitialParticipantsInputGroupStyle, setInitialParticipantsStyle} from './ComeInMember.style';

interface SetInitialParticipantsProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetOutMember = ({openBottomSheet, setOpenBottomSheet}: SetInitialParticipantsProps) => {
  const {inputs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputs} = useDynamicInput();

  return (
    <BottomSheet isOpened={openBottomSheet} onChangeClose={() => setOpenBottomSheet(false)}>
      망쵸모달 나감 모달
      <FixedButton onDeleteClick={() => alert('아아아앙')}>안녕</FixedButton>
    </BottomSheet>
  );
};

export default GetOutMember;
