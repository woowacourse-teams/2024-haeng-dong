import {useEffect, useState} from 'react';

import {BillInfo} from '@pages/event/[eventId]/admin/add-bill/AddBillFunnel';

import useRequestGetCurrentMembers from './queries/member/useRequestGetCurrentMembers';

export type BillStep = 'title' | 'price' | 'members';

const useAddBillFunnel = () => {
  const {currentMembers} = useRequestGetCurrentMembers();
  const [step, setStep] = useState<BillStep>('price');
  const [billInfo, setBillInfo] = useState<BillInfo>({
    price: '',
    title: '',
    members: [],
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    currentMembers && setBillInfo(prev => ({...prev, members: currentMembers}));
  }, [currentMembers]);

  return {step, setStep, billInfo, setBillInfo, currentMembers};
};

export default useAddBillFunnel;
