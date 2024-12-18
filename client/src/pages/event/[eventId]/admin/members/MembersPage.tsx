/** @jsxImportSource @emotion/react */
import {Report} from 'types/serviceType';
import {useTheme} from '@components/Design/theme/HDesignProvider';

import useEventMember from '@hooks/useEventMember';

import {MainLayout, TopNav, Top, Amount, DepositToggle, Icon, IconButton, FixedButton, Text} from '@components/Design';

import {eventMemberStyle, memberList, eventMember, memberEditInput, noneReports} from './MembersPage.style';

const MembersPage = () => {
  const {reports, canSubmit, changeMemberName, handleDeleteMember, updateMembersOnServer, toggleDepositStatus} =
    useEventMember();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <section css={eventMemberStyle}>
        <Top>
          <Top.Line text="전체 참여자 관리" emphasize={['전체 참여자 관리']}></Top.Line>
        </Top>
        <div css={memberList}>
          {reports.length === 0 ? (
            <div css={noneReports}>
              <Text size="bodyBold">참여자가 존재하지 않아요!</Text>
              <Text size="body" textColor="gray">
                지출내역을 추가하면 참여자가 생성돼요.
              </Text>
            </div>
          ) : (
            reports.map(member => {
              return (
                <Member
                  key={member.memberId}
                  member={member}
                  changeMemberName={changeMemberName}
                  handleDeleteMember={handleDeleteMember}
                  toggleDepositStatus={toggleDepositStatus}
                />
              );
            })
          )}
        </div>
        {reports.length === 0 ? (
          <></>
        ) : (
          <FixedButton disabled={!canSubmit} onClick={updateMembersOnServer}>
            수정완료
          </FixedButton>
        )}
      </section>
    </MainLayout>
  );
};

interface MemberProps {
  member: Report;
  changeMemberName: (memberId: number, newName: string) => void;
  handleDeleteMember: (memberId: number) => void;
  toggleDepositStatus: (memberId: number) => void;
}

const Member = ({member, changeMemberName, handleDeleteMember, toggleDepositStatus}: MemberProps) => {
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
          aria-label="인원 삭제"
        >
          <Icon iconType="trashMini" />
        </IconButton>
      </div>
    </div>
  );
};

export default MembersPage;
