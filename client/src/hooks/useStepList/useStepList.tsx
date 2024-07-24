import {PropsWithChildren, createContext, useEffect, useState} from 'react';
import {BillAction, MemberType, StepList} from 'types/stepList';
import stepListJsonData from '@mocks/stepList.json';

const stepListMockData = stepListJsonData as StepList;

const useStepList = () => {
  const [stepList, setStepList] = useState<StepList>(stepListMockData);

  useEffect(() => {
    // TODO: (@weadie) useEffect를 꼭 써야하는가?
    // 초기 리스트 불러서 setActionList
  }, []);

  const updateMemberList = (type: MemberType, memberList: string[]) => {
    // api를 호출하고 set한다
  };

  const addBill = (title: string, price: number) => {
    // api를 호출하고 set한다.
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

  return {stepList, getTotalPrice};
};

const StepListContext = createContext<StepList>([]); // TODO: (@weadie) 인자를 어떻게 줘야 하는지 고민하기.

const StepListProvider = ({children}: PropsWithChildren) => {
  const {stepList} = useStepList();

  return <StepListContext.Provider value={stepList}>{children}</StepListContext.Provider>;
};

export {useStepList, StepListProvider};
