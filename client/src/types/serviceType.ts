// *******************************************************************
// ******************** UX 개선 이후 변경된 부분들 24.09.19 ****************
// *******************************************************************

export interface Steps {
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
  price: number;
  isFixed: boolean;
}

export interface BillDetails {
  members: BillDetail[];
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
  memberName: string;
  isDeposited: boolean;
  price: number;
}

export interface Reports {
  reports: Report[];
}

export interface Images {
  images: ImageFile[];
}

export interface ImageFile {
  id: number;
  url: string;
}
