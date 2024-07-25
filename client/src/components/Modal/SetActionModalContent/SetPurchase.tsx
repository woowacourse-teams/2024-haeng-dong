import {Input, FixedButton} from 'haengdong-design';

import useDynamicInputPairs from '@hooks/useDynamicInputPairs';

import {setPurchaseInputStyle, setPurchaseStyle, setPurchaseInputContainerStyle} from './SetPurchase.style';
import {useStepList} from '@hooks/useStepList/useStepList';

interface SetPurchaseProps {
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
}

const SetPurchase = ({setOpenBottomSheet, setOrder}: SetPurchaseProps) => {
  const {inputPairs, inputRefs, handleInputChange, handleInputBlur, getNonEmptyInputPairs} = useDynamicInputPairs();
  const {addBill} = useStepList();

  const handleSetPurchaseSubmit = () => {
    setOrder(prev => prev + 1);

    // TODO: (@weadie) 요청 실패시 오류 핸들 필요
    addBill(getNonEmptyInputPairs());
    setOpenBottomSheet(false);
  };

  return (
    <div css={setPurchaseStyle}>
      <div css={setPurchaseInputContainerStyle}>
        {inputPairs.map((pair, index) => (
          <div key={index} css={setPurchaseInputStyle}>
            <Input
              type="text"
              value={pair.title}
              onChange={e => handleInputChange(index, 'title', e.target.value)}
              onBlur={() => handleInputBlur(index)}
              placeholder="지출 내역"
              ref={el => (inputRefs.current[index * 2] = el)}
            />
            <Input
              type="number"
              value={pair.price}
              onChange={e => handleInputChange(index, 'price', e.target.value)}
              onBlur={() => handleInputBlur(index)}
              placeholder="금액"
              ref={el => (inputRefs.current[index * 2 + 1] = el)}
            />
          </div>
        ))}
      </div>
      <FixedButton
        variants={inputPairs.length - 1 ? 'primary' : 'tertiary'}
        children={'추가하기'}
        onClick={handleSetPurchaseSubmit}
      />
    </div>
  );
};

export default SetPurchase;
