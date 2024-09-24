/** @jsxImportSource @emotion/react */
import {Report} from 'types/serviceType';

import useEventMember from '@hooks/useEventMember';

import {Back, MainLayout, TopNav, Top, Amount, DepositToggle, Icon, IconButton} from '@components/Design';
import {useTheme} from '@components/Design';

import {eventMemberMangeStyle, memberList, eventMember, memberEditInput} from './EventMemberManage.style';

const EventMemberManage = () => {
  const {reports, changeMemberName} = useEventMember();

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
            return <EventMember key={member.memberId} member={member} changeMemberName={changeMemberName} />;
          })}
        </div>
      </section>
    </MainLayout>
  );
};

interface EventMemberProps {
  member: Report;
  changeMemberName: (memberId: number, newName: string) => void;
}

const EventMember = ({member, changeMemberName}: EventMemberProps) => {
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
      <Amount amount={member.price} />
      <DepositToggle isDeposit={member.isDeposited} onToggle={() => {}} />
      <IconButton size="small" variants="tertiary" css={{width: '23px', height: '23px', borderRadius: '0.375rem'}}>
        <Icon iconType="trashMini" />
      </IconButton>
    </div>
  );
};

export default EventMemberManage;
