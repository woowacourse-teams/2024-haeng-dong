import {Member} from 'types/serviceType';

import useAddBillFunnel from '@hooks/useAddBillFunnel';

import {MainLayout, TopNav} from '@components/Design';

import PriceStep from './PriceStep';
import {TitleStep} from './TitleStep';
import MembersStep from './MembersStep';

export interface BillInfo {
  price: string;
  title: string;
  members: Member[];
}

const AddBillFunnel = () => {
  const {step, setStep, billInfo, setBillInfo, currentMembers} = useAddBillFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      ></TopNav>
      {step === 'price' && <PriceStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} />}
      {step === 'title' && <TitleStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} />}
      {step === 'members' && (
        <MembersStep billInfo={billInfo} setBillInfo={setBillInfo} currentMembers={currentMembers} setStep={setStep} />
      )}
    </MainLayout>
  );
};

export default AddBillFunnel;
