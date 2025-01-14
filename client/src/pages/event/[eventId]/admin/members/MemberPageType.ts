import {Report} from 'types/serviceType';

interface MemberActions {
  changeMemberName: (memberId: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDepositStatus: (memberId: number) => void;
  handleDeleteMember: (memberId: number) => void;
}

export interface ReturnUseEventMember extends MemberActions {
  reports: Report[];
  canSubmit: boolean;
  updateMembersOnServer: () => void;
}

export interface MemberProps extends MemberActions {
  member: Report;
}
