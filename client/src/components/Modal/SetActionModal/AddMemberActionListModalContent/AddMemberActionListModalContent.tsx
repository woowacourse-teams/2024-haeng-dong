import type {MemberType} from 'types/serviceType';

import {FixedButton, LabelGroupInput} from '@HDesign/index';
import validateMemberName from '@utils/validate/validateMemberName';
import useRequestPostMemberList from '@hooks/queries/useRequestPostMemberList';

import useDynamicInput from '@hooks/useDynamicInput';

import style from './AddMemberActionListModalContent.style';
import InMember from './InMember';
import OutMember from './OutMember';

interface AddMemberActionListModalContentProps {
  inOutAction: MemberType;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberActionListModalContent = ({inOutAction, setIsOpenBottomSheet}: AddMemberActionListModalContentProps) => {
  const dynamicProps = useDynamicInput(validateMemberName);
  const {inputList, getFilledInputList, errorMessage, canSubmit, resetInputValue} = dynamicProps;

  const {mutate: postMemberList} = useRequestPostMemberList();

  const handleUpdateMemberListSubmit = () => {
    postMemberList({memberNameList: getFilledInputList().map(({value}) => value), type: inOutAction});
    setIsOpenBottomSheet(false);
  };

  return (
    <div css={style.container}>
      <div css={style.inputGroup}>
        <LabelGroupInput labelText="이름" errorText={errorMessage ?? ''}>
          {inOutAction === 'IN' ? <InMember dynamicProps={dynamicProps} /> : <OutMember dynamicProps={dynamicProps} />}
        </LabelGroupInput>
      </div>
      <FixedButton
        disabled={!canSubmit}
        variants={'primary'}
        children={`${inputList.length - 1}명 ${inOutAction === 'OUT' ? '탈주' : '늦참'}`}
        onClick={() => {
          handleUpdateMemberListSubmit();
          resetInputValue();
        }}
      />
    </div>
  );
};

export default AddMemberActionListModalContent;
