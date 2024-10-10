import {useNavigate} from 'react-router-dom';

import {Button, Text, Icon, TopNav, IconButton} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';

type NavProps = {
  trackStartCreateEvent: () => void;
};

const Nav = ({trackStartCreateEvent}: NavProps) => {
  const navigate = useNavigate();

  const StartCreateEvent = () => {
    trackStartCreateEvent();
    navigate(ROUTER_URLS.createEvent);
  };

  return (
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '37px'}}>
      <TopNav>
        <TopNav.Item routePath="/">
          <IconButton variants="none">
            <Icon iconType="heundeut" />
          </IconButton>
        </TopNav.Item>
        <TopNav.Item routePath="/">
          <Text size="subTitle">행동대장</Text>
        </TopNav.Item>
      </TopNav>
      <Button size="medium" variants="tertiary" onClick={StartCreateEvent} style={{marginRight: '1rem'}}>
        정산 시작하기
      </Button>
    </header>
  );
};

export default Nav;
