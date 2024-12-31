import {useNavigate} from 'react-router-dom';

import {User} from 'types/serviceType';

import {Button, Text, TopNav, IconButton} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';

import {navFixedStyle, navStyle, navWrapperStyle} from './Nav.style';
import {IconHeundeut} from '@components/Design/components/Icons/Icons/IconHeundeut';

type NavProps = Pick<User, 'isGuest'>;

const Nav = ({isGuest}: NavProps) => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate(isGuest ? ROUTER_URLS.login : ROUTER_URLS.createUserEvent);
  };

  return (
    <div css={navFixedStyle}>
      <div css={navWrapperStyle}>
        <header css={navStyle}>
          <TopNav>
            <TopNav.Item routePath="/">
              <IconButton variants="none" aria-label="행동대장 로고">
                <IconHeundeut />
              </IconButton>
            </TopNav.Item>
            <TopNav.Item routePath="/">
              <Text size="subTitle">행동대장</Text>
            </TopNav.Item>
          </TopNav>
          <Button size="medium" variants="tertiary" onClick={goLogin} style={{marginRight: '1rem'}}>
            정산 시작하기
          </Button>
        </header>
      </div>
    </div>
  );
};

export default Nav;
