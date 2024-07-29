import {PropsWithChildren, createContext, useContext, useEffect, useState} from 'react';

import useEventId from '@hooks/useEventId/useEventId';
import {requestAddBillList} from '@apis/request/bill';
import {requestUpdateMemberList} from '@apis/request/member';
import {requestStepList} from '@apis/request/stepList';

import {BillAction, BillStep, MemberStep} from './type.ts';

interface StepListContextProps {
  stepList: (BillStep | MemberStep)[];
  getTotalPrice: () => number;
  addBill: (billList: Bill[]) => Promise<void>;
  updateMemberList: ({type, memberNameList}: {type: MemberType; memberNameList: string[]}) => Promise<void>;
  memberNameList: string[];
}

export const StepListContext = createContext<StepListContextProps | null>(null); // TODO: (@weadie) 인자를 어떻게 줘야 하는지 고민하기.

const StepListProvider = ({children}: PropsWithChildren) => {
  const [stepList, setStepList] = useState<(BillStep | MemberStep)[]>([]);
  const [memberNameList, setNameMemberList] = useState<string[]>([]);

  const {eventId} = useEventId();

  useEffect(() => {
    if (eventId === '') return;

    refreshStepList();

    // TODO: (@weadie) useEffect를 꼭 써야하는가?
  }, [eventId]);

  const refreshStepList = async () => {
    const stepList = await requestStepList({eventId});

    if (stepList.length !== 0) {
      setNameMemberList(stepList[stepList.length - 1].members);
    }

    setStepList(stepList);
  };

  const updateMemberList = async ({type, memberNameList}: {type: MemberType; memberNameList: string[]}) => {
    try {
      await requestUpdateMemberList({eventId, type, memberNameList});

      // TODO: (@weadie) 클라이언트 단에서 멤버 목록을 관리하기 위한 로직. 개선이 필요하다.
      if (type === 'IN') setNameMemberList(prev => [...prev, ...memberNameList]);
      if (type === 'OUT') setNameMemberList(prev => prev.filter(name => !memberNameList.includes(name)));

      refreshStepList();
    } catch (error) {
      alert(error);
    }
  };

  const addBill = async (billList: Bill[]) => {
    // TODO: (@weadie) 에러 처리
    await requestAddBillList({eventId, billList});

    refreshStepList();
  };

  const calculateBillSum = (actions: BillAction[]) => {
    return actions.reduce((sum, {price}) => sum + price, 0);
  };

  const getTotalPrice = () => {
    return stepList.reduce((sum, {type, actions}) => {
      if (type === 'BILL') {
        return sum + calculateBillSum(actions);
      }
      return sum;
    }, 0);
  };

  return (
    <StepListContext.Provider
      value={{
        addBill,
        getTotalPrice,
        updateMemberList,
        stepList,
        memberNameList,
      }}
    >
      {children}
    </StepListContext.Provider>
  );
};

export const useStepList = () => {
  const context = useContext(StepListContext);

  if (!context) {
    throw new Error('useStepList는 StepListProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export default StepListProvider;
