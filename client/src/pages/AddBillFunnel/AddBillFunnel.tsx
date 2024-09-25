import {Member} from 'types/serviceType';

import useAddBillFunnel from '@hooks/useAddBillFunnel';

import {MainLayout, TopNav} from '@components/Design';

import PriceStep from './steps/PriceStep';
import {TitleStep} from './steps/TitleStep';
import MembersStep from './steps/MembersStep';

export interface BillInfo {
  price: string;
  title: string;
  members: Member[];
}

const AddBillFunnel = () => {
  const {step, setStep, billInfo, setBillInfo, currentMembers} = useAddBillFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Element displayName="뒤로가기" routePath="-1" />
      </TopNav>
      {step === 'price' && <PriceStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} />}
      {step === 'title' && <TitleStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} />}
      {step === 'members' && (
        <MembersStep billInfo={billInfo} setBillInfo={setBillInfo} currentMembers={currentMembers} setStep={setStep} />
      )}
    </MainLayout>
  );
};

export default AddBillFunnel;
