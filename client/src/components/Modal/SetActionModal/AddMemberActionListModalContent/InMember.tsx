import {LabelGroupInput} from 'haengdong-design';

import {ReturnUseDynamicInput} from '@hooks/useDynamicInput';

interface InMemberProps {
  dynamicProps: ReturnUseDynamicInput;
}

const InMember = ({dynamicProps}: InMemberProps) => {
  const {
    inputList,
    inputRefList,
    handleInputChange,
    deleteEmptyInputElementOnBlur,
    focusNextInputOnEnter,
    errorIndexList,
  } = dynamicProps;
  return inputList.map(({value, index}) => (
    <LabelGroupInput.Element
      key={index}
      elementKey={`${index}`}
      type="text"
      value={value}
      ref={el => (inputRefList.current[index] = el)}
      isError={errorIndexList.includes(index)}
      onChange={e => handleInputChange(index, e)}
      onBlur={() => deleteEmptyInputElementOnBlur()}
      onKeyDown={e => focusNextInputOnEnter(e, index)}
      placeholder="이름"
    />
  ));
};

export default InMember;
