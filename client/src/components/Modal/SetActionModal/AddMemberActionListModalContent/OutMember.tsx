import {LabelGroupInput, Search} from '@HDesign/index';

import {ReturnUseDynamicInput} from '@hooks/useDynamicInput';
import useSearchInMemberList from '@hooks/useSearchInMemberList';

interface OutMemberProps {
  dynamicProps: ReturnUseDynamicInput;
}

const OutMember = ({dynamicProps}: OutMemberProps) => {
  const {
    inputList,
    inputRefList,
    errorIndexList,
    deleteEmptyInputElementOnBlur,
    focusNextInputOnEnter,
    handleInputChange,
    handleChange,
  } = dynamicProps;
  const {currentInputIndex, filteredInMemberList, handleCurrentInputIndex, searchCurrentInMember, chooseMember} =
    useSearchInMemberList(handleChange);

  const validationAndSearchOnChange = (inputIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrentInputIndex(inputIndex);
    handleInputChange(inputIndex, event);
    searchCurrentInMember(event);
  };

  return inputList.map(({value, index}) => (
    <Search
      key={index}
      isShowTargetInput={currentInputIndex === index}
      matchItems={filteredInMemberList}
      onMatchItemClick={(term: string) => chooseMember(currentInputIndex, term)}
    >
      <LabelGroupInput.Element
        elementKey={`${index}`}
        type="text"
        value={value}
        ref={el => (inputRefList.current[index] = el)}
        isError={errorIndexList.includes(index)}
        onChange={e => validationAndSearchOnChange(index, e)}
        onBlur={() => deleteEmptyInputElementOnBlur()}
        onKeyDown={e => focusNextInputOnEnter(e, index)}
        placeholder="이름"
        autoFocus={inputList.length === 1 && index === 0}
      />
    </Search>
  ));
};

export default OutMember;
