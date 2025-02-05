import {useNavigate} from 'react-router-dom';

import {User} from 'types/serviceType';
import {IconHeundeut} from '@components/Design/components/Icons/Icons/IconHeundeut';

import {Button, TopNav} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';

import {navFixedStyle, navWrapperStyle} from './Nav.style';

type NavProps = Pick<User, 'isGuest'>;

const Nav = ({isGuest}: NavProps) => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate(isGuest ? ROUTER_URLS.login : ROUTER_URLS.main);
  };

  return (
    <div css={navFixedStyle}>
      <div css={navWrapperStyle}>
        <TopNav
          left={
            <>
              <TopNav.Icon routePath="/" aria-label="행동대장 로고" component={<IconHeundeut />} />
              <TopNav.Text routePath="/" textSize="subTitle" isEmphasis={true}>
                행동대장
              </TopNav.Text>
            </>
          }
          right={
            <Button size="medium" variants="tertiary" onClick={goLogin}>
              정산 시작하기
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Nav;
