import {LabelGroupInput, Search} from 'haengdong-design';

import {ReturnUseDynamicInput} from '@hooks/useDynamicInput';
import useSearchInMemberList from '@hooks/useSearchInMemberList';

interface OutMemberProps {
  dynamicProps: ReturnUseDynamicInput;
}

const OutMember = ({dynamicProps}: OutMemberProps) => {
  const {
    inputList,
    inputRefList,
    deleteEmptyInputElementOnBlur,
    focusNextInputOnEnter,
    handleInputChange,
    setInputValueTargetIndex,
  } = dynamicProps;
  const {currentInputIndex, filteredInMemberList, handleCurrentInputIndex, searchCurrentInMember, chooseMember} =
    useSearchInMemberList(setInputValueTargetIndex);

  const validationAndSearchOnChange = (inputIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrentInputIndex(inputIndex);
    handleInputChange(inputIndex, event);
    searchCurrentInMember(event);
  };

  return inputList.map(({value, index}) => (
    <Search
      isShowTargetInput={currentInputIndex === index}
      matchItems={filteredInMemberList}
      onMatchItemClick={(term: string) => chooseMember(currentInputIndex, term)}
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
  ));
};

export default OutMember;
