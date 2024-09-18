export type MemberType = 'IN' | 'OUT';

export type InOutType = '늦참' | '탈주';

export type MemberReport = {
  name: string;
  price: number;
};

export type MemberReportInAction = MemberReport & {
  isFixed: boolean;
};

// export type Bill = {
//   title: string;
//   price: number;
// };

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
// export type StepList = {
//   steps: (MemberStep | BillStep)[];
// };

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

// export type Member = {
//   name: string;
//   status: MemberType;
// };

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

export type InputPair = Omit<Bill, 'price'> & {
  price: string;
  index: number;
};

export type BillInputType = 'title' | 'price';

// *******************************************************************
// ******************** UX 개선 이후 변경된 부분들 24.09.19 ****************
// *******************************************************************

export interface StepList {
  steps: Step[];
}

export interface Step {
  bills: Bill[];
  members: Member[];
}

export interface Bill {
  id: number;
  title: string;
  price: number;
  isFixed: boolean;
}

export interface BillDetail {
  id: number;
  memberName: string;
  price: string;
}
export interface BillDetails {
  billDetails: BillDetail[];
}

export interface Member {
  id: number;
  name: string;
}

export interface Members {
  members: Member[];
}

export interface MemberWithDeposited extends Member {
  isDeposited: boolean;
}

export interface AllMembers {
  members: MemberWithDeposited[];
}
export interface EventId {
  eventId: string;
}

export interface Event {
  eventName: string;
  bankName: string;
  accountNumber: string;
}

export interface Report {
  memberId: number;
  name: string;
  isDeposited: boolean;
  price: number;
}

export interface Reports {
  reports: Report[];
}
