import {useNavigate} from 'react-router-dom';

import {useTheme} from '@theme/HDesignProvider';

import {Button, Flex, Text, Icon, TopNav, IconButton} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';

const Nav = () => {
  const {theme} = useTheme();
  const navigate = useNavigate();
  return (
    <Flex justifyContent="spaceBetween" alignItems="center" margin="0 1rem" height="37px">
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
      <Button size="medium" variants="tertiary" onClick={() => navigate(ROUTER_URLS.createEvent)}>
        정산 시작하기
      </Button>
    </Flex>
  );
};

export default Nav;
