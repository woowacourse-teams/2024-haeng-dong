/** @jsxImportSource @emotion/react */
import {Back, MainLayout, TopNav, Top, Amount, DepositToggle, Icon, IconButton} from '@components/Design';
import {useTheme} from '@components/Design';

import {eventMemberMangeStyle, memberList, eventMember, memberEditInput} from './EventMemberManage.style';

const EventMemberManage = () => {
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
          <EventMember />
          <EventMember />
          <EventMember />
        </div>
      </section>
    </MainLayout>
  );
};

const EventMember = () => {
  const {theme} = useTheme();

  return (
    <div css={eventMember}>
      <div css={memberEditInput(theme)}>
        <input type="text" value={'소하'} />
        <Icon iconType="pencilMini" />
      </div>
      <Amount amount={12000} />
      <DepositToggle isDeposit={false} onToggle={() => {}} />
      <IconButton size="small" variants="tertiary" css={{width: '23px', height: '23px', borderRadius: '0.375rem'}}>
        <Icon iconType="trashMini" />
      </IconButton>
    </div>
  );
};

export default EventMemberManage;
