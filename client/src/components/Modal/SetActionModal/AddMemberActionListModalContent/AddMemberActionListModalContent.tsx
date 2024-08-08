import type {MemberType} from 'types/serviceType';

import {FixedButton, LabelGroupInput} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';
import validateMemberName from '@utils/validate/validateMemberName';

import useSearchInMemberList from '@hooks/useSearchInMemberList';
import useDynamicInput from '@hooks/useDynamicInput';

import style from './AddMemberActionListModalContent.style';
import Search from './Search/Search';

interface AddMemberActionListModalContentProps {
  inOutAction: MemberType;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberActionListModalContent = ({inOutAction, setIsOpenBottomSheet}: AddMemberActionListModalContentProps) => {
  const {
    inputList,
    inputRefList,
    handleInputChange,
    deleteEmptyInputElementOnBlur,
    getFilledInputList,
    errorMessage,
    canSubmit,
    focusNextInputOnEnter,
    setInputValueTargetIndex,
  } = useDynamicInput(validateMemberName);

  const {updateMemberList} = useStepList();

  const handleUpdateMemberListSubmit = () => {
    updateMemberList({memberNameList: getFilledInputList().map(({value}) => value), type: inOutAction});
    setIsOpenBottomSheet(false);
  };

  const {filteredInMemberList, currentInputIndex, handleCurrentInputIndex, searchCurrentInMember, chooseMember} =
    useSearchInMemberList(setInputValueTargetIndex);

  const validationAndSearchOnChange = (inputIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrentInputIndex(inputIndex);
    handleInputChange(inputIndex, event);
    searchCurrentInMember(event);
  };

  return (
    <div css={style.container}>
      <div css={style.inputGroup}>
        {/* TODO: (@soha) Search로 변경하기 */}
        <LabelGroupInput labelText="이름" errorText={errorMessage}>
          {inputList.map(({value, index}) => (
            <Search
              isShow={currentInputIndex === index}
              searchTerms={filteredInMemberList}
              onTermClick={(term: string) => chooseMember(currentInputIndex, term)}
            >
              <LabelGroupInput.Element
                key={index}
                elementKey={`${index}`}
                type="text"
                value={value}
                ref={el => (inputRefList.current[index] = el)}
                onChange={e => validationAndSearchOnChange(index, e)}
                onBlur={() => deleteEmptyInputElementOnBlur()}
                onKeyDown={e => focusNextInputOnEnter(e, index)}
                placeholder="이름"
              />
            </Search>
          ))}
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
