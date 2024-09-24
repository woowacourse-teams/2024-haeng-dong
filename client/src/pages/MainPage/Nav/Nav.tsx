import {useNavigate} from 'react-router-dom';

import Heundeut from '@assets/image/heundeut.svg';

import {Button, Flex, Text} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';

import {logoStyle, navStyle} from './Nav.style';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <header css={navStyle}>
      <Flex gap="0.5rem">
        <Heundeut />
        <div css={logoStyle}>
          <Text size="subTitle">행동대장</Text>
        </div>
      </Flex>
      <Button size="medium" variants="tertiary" onClick={() => navigate(ROUTER_URLS.createEvent)}>
        정산 시작하기
      </Button>
    </header>
  );
};

export default Nav;
