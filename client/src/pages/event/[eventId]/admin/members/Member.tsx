import {useState} from 'react';

import {useTheme} from '@components/Design/theme/HDesignProvider';
import {IconEdit} from '@components/Design/components/Icons/Icons/IconEdit';
import {IconTrash} from '@components/Design/components/Icons/Icons/IconTrash';
import validateMemberName from '@utils/validate/validateMemberName';

import {Amount, DepositToggle, IconButton} from '@components/Design';

import {MemberNameInputProps, MemberProps} from './MemberPageType';
import {deleteButtonStyle, eventMember, memberEditInput} from './MembersPage.style';

const Member = ({member, changeMemberName, handleDeleteMember, toggleDepositStatus}: MemberProps) => {
  return (
    <div css={eventMember} id={`${member.memberId}`}>
      <MemberNameInput member={member} changeMemberName={changeMemberName} />
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
        <Amount amount={member.price} />
        <DepositToggle isDeposit={member.isDeposited} onToggle={() => toggleDepositStatus(member.memberId)} />
        <IconButton
          size="small"
          variants="tertiary"
          css={deleteButtonStyle}
          onClick={() => handleDeleteMember(member.memberId)}
          aria-label="인원 삭제"
        >
          <IconTrash size={14} />
        </IconButton>
      </div>
    </div>
  );
};

const MemberNameInput = ({member, changeMemberName}: MemberNameInputProps) => {
  const {theme} = useTheme();

  const [isError, setIsError] = useState<boolean>(false);

  const handleChangeMemberName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    const {isValid, memberName: memberNameResult} = validateMemberName(newName);
    setIsError(!isValid);

    if (isValid || memberNameResult.length === 0) {
      changeMemberName(member.memberId, memberNameResult);
    }
  };

  return (
    <div css={memberEditInput(theme, isError)}>
      <input type="text" value={member.memberName} onChange={handleChangeMemberName} placeholder="행댕이" />
      <IconEdit size={14} />
    </div>
  );
};

export default Member;
