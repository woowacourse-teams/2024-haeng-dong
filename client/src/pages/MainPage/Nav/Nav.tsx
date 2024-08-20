import {css} from '@emotion/react';
import {logoStyle, navStyle} from './Nav.style';
import {Logo} from '@components/Common/Logo';
import {Button, Text} from 'haengdong-design';
import {useNavigate} from 'react-router-dom';
import {ROUTER_URLS} from '@constants/routerUrls';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <header css={navStyle}>
      <div css={logoStyle}>
        <Text size="subTitle">행동대장</Text>
      </div>
      <Button size="medium" variants="tertiary" onClick={() => navigate(ROUTER_URLS.eventCreateName)}>
        정산 시작하기
      </Button>
    </header>
  );
};

export default Nav;
