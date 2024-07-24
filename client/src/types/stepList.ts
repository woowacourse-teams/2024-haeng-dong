export type MemberType = 'IN' | 'OUT';

// TODO: (@weadie) 준 데이터 형식에서 steps를 빼내 flat하게 사용중. 일관성있게 하는게 좋긴 하나 사용시 번거로움이 있을 거라고 판단.
export type StepList = (MemberStep | BillStep)[];

export type Step = {
  type: MemberType | 'BILL';
  stepName: string | null;
  actions: (BillAction | MemberAction)[];
};

export type MemberStep = Omit<Step, 'type' | 'stepName' | 'actions'> & {
  type: MemberType;
  stepName: null;
  actions: MemberAction[];
};

export type BillStep = Omit<Step, 'type' | 'stepName' | 'actions'> & {
  type: 'BILL';
  stepName: string;
  actions: BillAction[];
};

export type Action = {
  actionId: number;
  name: string;
  price: number | null;
  sequence?: number;
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

export type Bill = {
  title: string;
  price: number;
};

export type MemberReport = {
  name: string;
  price: number;
};
