import {useState} from 'react';
import {Input, FixedButton} from 'haengdong-design';
import {css} from '@emotion/react';

import {PurchaseInformation} from '@pages/Event/Event';

import {setPurchaseInputStyle, setPurchaseStyle, setPurchaseInputContainerStyle} from './SetPurchase.style';

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
      <div css={setPurchaseInputContainerStyle}>
        <div css={setPurchaseInputStyle}>
          <Input type="text" value={newPurchaseInformation.name} onChange={handleNameChange} placeholder="지출 내역" />
          <Input type="number" value={newPurchaseInformation.price} onChange={handlePriceChange} placeholder="금액" />
        </div>
      </div>
      <FixedButton variants={'primary'} children={'추가하기'} />
    </div>
  );
};

export default SetPurchase;
