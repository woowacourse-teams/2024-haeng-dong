import {useState} from 'react';
import {Input, Switch} from 'haengdong-design';
import {css} from '@emotion/react';

import {PurchaseInformation} from '@pages/Event/Event';

import {setPurchaseInputStyle, setPurchaseStyle} from './SetPurchase.style';

interface SetPurchaseProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPurchaseInformation: any;
  purchaseInformation: any;
}

const SetPurchase = ({setOpen, setPurchaseInformation}: SetPurchaseProps) => {
  const [newPurchaseInformation, setNewPurchaseInformation] = useState<PurchaseInformation>({
    name: '',
    price: 0,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPurchaseInformation({...newPurchaseInformation, name: e.target.value});
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPurchaseInformation({...newPurchaseInformation, price: parseFloat(e.target.value)});
  };

  const addPurchaseInformation = () => {
    setPurchaseInformation((prev: PurchaseInformation[]) => [...prev, newPurchaseInformation]);
    setOpen(false);
  };

  return (
    <div css={setPurchaseStyle}>
      {/* <Switch/> */}
      {/* TODO: (@soha) Switch는 고정, Input을 묶은 div는 Scroll */}
      <div css={setPurchaseStyle}>
        {/* TODO: (@soha) Input만을 담은 것을 또 묶어준 이유는 Switch 부분은 scroll되지 않고 고정되게 하기 위함임 */}
        <div css={setPurchaseInputStyle}>
          <Input type="text" value={newPurchaseInformation.name} onChange={handleNameChange} placeholder="지출 내역" />
          <Input type="number" value={newPurchaseInformation.price} onChange={handlePriceChange} placeholder="금액" />
        </div>

        <div css={setPurchaseInputStyle}>
          <Input type="text" value={newPurchaseInformation.name} onChange={handleNameChange} placeholder="지출 내역" />
          <Input type="number" value={newPurchaseInformation.price} onChange={handlePriceChange} placeholder="금액" />
        </div>
      </div>
    </div>
  );
};

export default SetPurchase;
