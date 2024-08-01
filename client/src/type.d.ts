type MemberType = 'IN' | 'OUT';

type InOutType = '늦참' | '탈주';

type MemberReport = {
  name: string;
  price: number;
};

type Bill = {
  title: string;
  price: number;
};

// TODO: (@weadie) 준 데이터 형식에서 steps를 빼내 flat하게 사용중. 일관성있게 하는게 좋긴 하나 사용시 번거로움이 있을 거라고 판단.
type StepList = {
  steps: (MemberStep | BillStep)[];
};

type Step = {
  type: MemberType | 'BILL';
  stepName: string | null;
  members: string[];
  actions: (BillAction | MemberAction)[];
};

type MemberStep = Omit<Step, 'type' | 'stepName' | 'actions'> & {
  type: MemberType;
  stepName: null;
  actions: MemberAction[];
};

type BillStep = Omit<Step, 'type' | 'stepName' | 'actions'> & {
  type: 'BILL';
  stepName: string;
  actions: BillAction[];
};

type Action = {
  actionId: number;
  name: string;
  price: number | null;
  sequence: number;
};

type BillAction = Omit<Action, 'price'> & {
  price: number;
};

type MemberAction = Omit<Action, 'price'> & {
  price: null;
};

type Member = {
  name: string;
  status: MemberType;
};
