import type {MemberType} from 'types/serviceType';

import {FixedButton, LabelGroupInput} from 'haengdong-design';
import {useEffect} from 'react';

import validateMemberName from '@utils/validate/validateMemberName';

import useDynamicInput from '@hooks/useDynamicInput';
import useRequestPostMemberList from '@hooks/useRequestPostMemberList';

import style from './AddMemberActionListModalContent.style';
import InMember from './InMember';
import OutMember from './OutMember';

interface AddMemberActionListModalContentProps {
  inOutAction: MemberType;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberActionListModalContent = ({inOutAction, setIsOpenBottomSheet}: AddMemberActionListModalContentProps) => {
  const dynamicProps = useDynamicInput(validateMemberName);
  const {inputList, getFilledInputList, errorMessage, canSubmit} = dynamicProps;

  const {mutate: postMemberList, isSuccess: isSuccessPostMemberList} = useRequestPostMemberList();

  const handleUpdateMemberListSubmit = () => {
    postMemberList({memberNameList: getFilledInputList().map(({value}) => value), type: inOutAction});
    setIsOpenBottomSheet(false);
  };

  return (
    <div css={style.container}>
      <div css={style.inputGroup}>
        <LabelGroupInput labelText="이름" errorText={errorMessage}>
          {inOutAction === 'IN' ? <InMember dynamicProps={dynamicProps} /> : <OutMember dynamicProps={dynamicProps} />}
        </LabelGroupInput>
      </div>
      <FixedButton
        disabled={!canSubmit}
        variants={'primary'}
        children={`${inputList.length - 1}명 ${inOutAction === 'OUT' ? '탈주' : '늦참'}`}
        onClick={handleUpdateMemberListSubmit}
      />
    </div>
  );
};

export default AddMemberActionListModalContent;
