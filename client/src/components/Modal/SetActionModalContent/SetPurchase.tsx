import {PurchaseInformation} from '../../../pages/Event/Event';

interface SetPurchaseProps {
  setPurchaseInformation: (info: PurchaseInformation) => void;
  purchaseInformation: PurchaseInformation;
}

const SetPurchase = ({setPurchaseInformation, purchaseInformation}: SetPurchaseProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseInformation({...purchaseInformation, name: e.target.value});
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseInformation({...purchaseInformation, price: parseFloat(e.target.value)});
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <input type="text" value={purchaseInformation.name} onChange={handleNameChange} placeholder="지출 내역" />
        <input type="number" value={purchaseInformation.price} onChange={handlePriceChange} placeholder="금액" />
      </div>
      <button style={{backgroundColor: 'lightGreen'}}>지출 내역 작성 완료</button>
    </>
  );
};

export default SetPurchase;
