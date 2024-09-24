/** @jsxImportSource @emotion/react */
import {Report} from 'types/serviceType';

import useEventMember from '@hooks/useEventMember';

import {Back, MainLayout, TopNav, Top, Amount, DepositToggle, Icon, IconButton, FixedButton} from '@components/Design';
import {useTheme} from '@components/Design';

import {eventMemberMangeStyle, memberList, eventMember, memberEditInput} from './EventMemberManage.style';

const EventMemberManage = () => {
  const {reports, isCanRequest, changeMemberName, handleDeleteMember, updateMembersOnServer, toggleDepositStatus} =
    useEventMember();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      <section css={eventMemberMangeStyle}>
        <Top>
          <Top.Line text="전체 참여자 관리" emphasize={['전체 참여자 관리']}></Top.Line>
        </Top>
        <div css={memberList}>
          {reports.map(member => {
            return (
              <EventMember
                key={member.memberId}
                member={member}
                changeMemberName={changeMemberName}
                handleDeleteMember={handleDeleteMember}
                toggleDepositStatus={toggleDepositStatus}
              />
            );
          })}
        </div>
        <FixedButton disabled={!isCanRequest} onClick={updateMembersOnServer}>
          수정완료
        </FixedButton>
      </section>
    </MainLayout>
  );
};

interface EventMemberProps {
  member: Report;
  changeMemberName: (memberId: number, newName: string) => void;
  handleDeleteMember: (memberId: number) => void;
  toggleDepositStatus: (memberId: number) => void;
}

const EventMember = ({member, changeMemberName, handleDeleteMember, toggleDepositStatus}: EventMemberProps) => {
  const {theme} = useTheme();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeMemberName(member.memberId, e.target.value);
  };

  return (
    <div css={eventMember} id={`${member.memberId}`}>
      <div css={memberEditInput(theme)}>
        <input type="text" value={member.memberName} onChange={e => handleChangeName(e)} />
        <Icon iconType="pencilMini" />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
        <Amount amount={member.price} />
        <DepositToggle isDeposit={member.isDeposited} onToggle={() => toggleDepositStatus(member.memberId)} />
        <IconButton
          size="small"
          variants="tertiary"
          css={{width: '23px', height: '23px', borderRadius: '0.375rem'}}
          onClick={() => handleDeleteMember(member.memberId)}
        >
          <Icon iconType="trashMini" />
        </IconButton>
      </div>
    </div>
  );
};

export default EventMemberManage;
