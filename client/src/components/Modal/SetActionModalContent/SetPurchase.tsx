import {Input, FixedButton} from 'haengdong-design';

import useDynamicInputPairs from '@hooks/useDynamicInputPairs';

import {setPurchaseInputStyle, setPurchaseStyle, setPurchaseInputContainerStyle} from './SetPurchase.style';

interface SetPurchaseProps {
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetPurchase = ({setOpenBottomSheet}: SetPurchaseProps) => {
  const {inputPairs, inputRefs, handleInputChange, handleInputBlur} = useDynamicInputPairs();

  const handleSetPurchaseSubmit = () => {
    // TODO: (@soha) api 요청시 inputPairs를 보내면 됨
    setOpenBottomSheet(false);
  };

  return (
    <div css={setPurchaseStyle}>
      <div css={setPurchaseInputContainerStyle}>
        {inputPairs.map((pair, index) => (
          <div key={index} css={setPurchaseInputStyle}>
            <Input
              type="text"
              value={pair.name}
              onChange={e => handleInputChange(index, 'name', e.target.value)}
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
