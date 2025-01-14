import {Report} from 'types/serviceType';

interface MemberActions {
  changeMemberName: (memberId: number, newName: string) => void;
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

export interface MemberNameInputProps {
  member: Report;
  changeMemberName: (memberId: number, newName: string) => void;
}
