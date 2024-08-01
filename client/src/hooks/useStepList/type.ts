export type Step = {
  type: MemberType | 'BILL';
  stepName: string | null;
  members: string[];
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
  sequence: number;
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
