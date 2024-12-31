import {Flex, IconButton, MainLayout, TopNav} from '@components/Design';
import {IconHeundeut} from '@components/Design/components/Icons/Icons/IconHeundeut';
import {Footer} from '@components/Footer';

const EventPageLoading = () => {
  return (
    <MainLayout backgroundColor="gray">
      <Flex justifyContent="spaceBetween" alignItems="center">
        <TopNav>
          <TopNav.Item routePath="/">
            <IconButton variants="none">
              <IconHeundeut />
            </IconButton>
          </TopNav.Item>
          <TopNav.Item displayName="홈" routePath="/home" />
          <TopNav.Item displayName="관리" routePath="/admin" />
        </TopNav>
      </Flex>
      <Footer />
    </MainLayout>
  );
};

export default EventPageLoading;
