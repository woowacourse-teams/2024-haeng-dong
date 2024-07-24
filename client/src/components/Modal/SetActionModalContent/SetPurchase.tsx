import {useState} from 'react';

import {PurchaseInformation} from '@pages/Event/Event';

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
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <input type="text" value={newPurchaseInformation.name} onChange={handleNameChange} placeholder="지출 내역" />
        <input type="number" value={newPurchaseInformation.price} onChange={handlePriceChange} placeholder="금액" />
      </div>
      <button style={{backgroundColor: 'lightGreen'}} onClick={addPurchaseInformation}>
        지출 내역 작성 완료
      </button>
    </>
  );
};

export default SetPurchase;
