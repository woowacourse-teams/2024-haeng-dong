import {useEffect, useState} from 'react';

import useRequestGetCurrentMembers from '@hooks/queries/member/useRequestGetCurrentMembers';
import {Member} from 'types/serviceType';

import {Back, MainLayout, TopNav} from '@components/Design';

import PriceStep from './steps/PriceStep';
import {TitleStep} from './steps/TitleStep';
import MembersStep from './steps/MembersStep';
import useAddBillFunnel from '@hooks/useAddBillFunnel';

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
        <Back />
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
