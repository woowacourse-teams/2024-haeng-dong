/** @jsxImportSource @emotion/react */

import useEventMember from '@hooks/useEventMember';

import {MainLayout, TopNav, Top, FixedButton, Text} from '@components/Design';

import {eventMemberStyle, memberList, noneReports} from './MembersPage.style';
import Member from './Member';

const MembersPage = () => {
  const {reports, canSubmit, changeMemberName, handleDeleteMember, updateMembersOnServer, toggleDepositStatus} =
    useEventMember();

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      ></TopNav>
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

export default MembersPage;
