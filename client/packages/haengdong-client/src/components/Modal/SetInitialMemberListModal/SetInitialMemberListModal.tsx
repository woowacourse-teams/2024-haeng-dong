import {Text, BottomSheet, FixedButton, LabelGroupInput} from 'haengdong-design';

import validateMemberName from '@utils/validate/validateMemberName';
import useRequestPostMemberList from '@hooks/queries/useRequestPostMemberList';

import useDynamicInput from '@hooks/useDynamicInput';

import {
  setInitialMemberListModalInputGroupStyle,
  setInitialMemberListModalStyle,
} from './SetInitialMemberListModal.style';

interface SetInitialMemberListProps {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetInitialMemberListModal = ({isOpenBottomSheet, setIsOpenBottomSheet}: SetInitialMemberListProps) => {
  const {
    inputList,
    inputRefList,
    handleInputChange,
    deleteEmptyInputElementOnBlur,
    getFilledInputList,
    errorMessage,
    canSubmit,
    errorIndexList,
    focusNextInputOnEnter,
  } = useDynamicInput(validateMemberName);
  const {mutate: postMemberList} = useRequestPostMemberList();

  const handleSubmit = () => {
    postMemberList({memberNameList: getFilledInputList().map(({value}) => value), type: 'IN'});
    setIsOpenBottomSheet(false);
  };

  return (
    <BottomSheet isOpened={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
      <div css={setInitialMemberListModalStyle}>
        <Text size="bodyBold">시작 인원 추가하기</Text>
        <div css={setInitialMemberListModalInputGroupStyle}>
          <LabelGroupInput labelText="이름" errorText={errorMessage ?? ''}>
            {inputList.map(({value, index}) => (
              <LabelGroupInput.Element
                key={`${index}`}
                elementKey={`${index}`}
                placeholder="이름"
                type="text"
                value={value}
                isError={errorIndexList.includes(index)}
                ref={el => (inputRefList.current[index] = el)}
                onChange={e => handleInputChange(index, e)}
                onBlur={() => deleteEmptyInputElementOnBlur()}
                onKeyDown={e => focusNextInputOnEnter(e, index)}
                autoFocus={inputList.length === 1 && index === 0}
              />
            ))}
          </LabelGroupInput>
        </div>
      </div>
      <FixedButton disabled={!canSubmit} variants={'primary'} onClick={handleSubmit} children={'인원 설정 완료'} />
    </BottomSheet>
  );
};

export default SetInitialMemberListModal;
