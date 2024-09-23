import {useEffect, useState} from 'react';

import useRequestGetCurrentMembers from '@hooks/queries/member/useRequestGetCurrentMembers';
import {Member} from 'types/serviceType';

import {Back, MainLayout, TopNav} from '@components/Design';

import PriceStep from './steps/PriceStep';
import {TitleStep} from './steps/TitleStep';
import MembersStep from './steps/MembersStep';

export type BillStep = 'title' | 'price' | 'members';

export interface BillInfo {
  price: string;
  title: string;
  members: Member[];
}

const AddBillFunnel = () => {
  const {currentMembers} = useRequestGetCurrentMembers();
  const [step, setStep] = useState<BillStep>('price');
  const [billInfo, setBillInfo] = useState<BillInfo>({
    price: '',
    title: '',
    members: [],
  });

  useEffect(() => {
    currentMembers && setBillInfo(prev => ({...prev, members: currentMembers}));
  }, [currentMembers]);

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      {step === 'price' && <PriceStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} />}
      {step === 'title' && <TitleStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} />}
      {step === 'members' && (
        <MembersStep billInfo={billInfo} setBillInfo={setBillInfo} setStep={setStep} currentMembers={currentMembers} />
      )}
    </MainLayout>
  );
};

export default AddBillFunnel;
