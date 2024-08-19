export type MemberType = 'IN' | 'OUT';

export type InOutType = '늦참' | '탈주';

export type MemberReport = {
  name: string;
  price: number;
};

export type Bill = {
  title: string;
  price: number;
};

type StepBase = {
  members: string[];
};

export type MemberStep = StepBase & {
  type: MemberType;
  stepName: null;
  actions: MemberAction[];
};

export type BillStep = StepBase & {
  type: 'BILL';
  stepName: string;
  actions: BillAction[];
};

// (@weadie) 준 데이터 형식에서 steps를 빼내 flat하게 사용중. 일관성있게 하는게 좋긴 하나 사용시 번거로움이 있을 거라고 판단.
export type StepList = {
  steps: (MemberStep | BillStep)[];
};

export type Action = {
  actionId: number;
  name: string;
  price: number | null;
  sequence: number;
  isFixed: boolean;
};

export type BillAction = Omit<Action, 'price'> & {
  price: number;
};

export type MemberAction = Omit<Action, 'price'> & {
  price: null;
};

export type Member = {
  name: string;
  status: MemberType;
};

export type ActionType = 'IN' | 'OUT' | 'BILL';

// export type StepList = {
//   actions: Action[];
// };

export type ConvertedAction = {
  actionId: number;
  name: string;
  price: string | null;
  sequence: number;
  type: ActionType;
};
