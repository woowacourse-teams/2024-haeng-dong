// *******************************************************************
// ******************** UX 개선 이후 변경된 부분들 24.09.19 ****************
// *******************************************************************

import BANKS from '@constants/bank';

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

export type EventId = string;
export type EventName = string;
export type Nickname = string;
export type Password = string;

export interface EventCreationData {
  eventName: EventName;
  nickname: Nickname;
  password: Password;
}

export type BankName = (typeof BANKS)[number]['name'] | '';
export type BankAccount = {
  bankName: BankName;
  accountNumber: string;
};

export type Event = BankAccount & {
  eventName: EventName;
  createdByGuest: boolean;
};

export type User = BankAccount & {
  nickname: Nickname;
  isGuest: boolean;
  profileImage: string | null;
};

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

export type UserInfo = BankAccount & {
  nickname: string;
  isGuest: boolean;
  profileImage: string | null;
};

export interface CreatedEvent {
  eventId: string;
  eventName: string;
  isFinished: boolean;
  createdAt: string;
}

export interface CreatedEvents {
  events: CreatedEvent[];
}
