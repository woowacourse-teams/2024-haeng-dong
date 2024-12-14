import {Flex, Icon, IconButton, MainLayout, TopNav} from '@components/Design';
import {Footer} from '@components/Footer';

const EventPageLoading = () => {
  return (
    <MainLayout backgroundColor="gray">
      <Flex justifyContent="spaceBetween" alignItems="center">
        <TopNav>
          <TopNav.Item routePath="/">
            <IconButton variants="none">
              <Icon iconType="heundeut" />
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
