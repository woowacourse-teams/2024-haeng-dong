import {IconHeundeut} from '@components/Design/components/Icons/Icons/IconHeundeut';

import {Flex, IconButton, MainLayout, TopNav} from '@components/Design';
import {Footer} from '@components/Footer';

import {PATHS} from '@constants/routerUrls';

const EventPageLoading = () => {
  return (
    <MainLayout backgroundColor="gray">
      <TopNav
        left={
          <>
            <TopNav.Icon routePath="/" component={<IconHeundeut />} />
            <TopNav.Text routePath="/">홈</TopNav.Text>
            <TopNav.Text routePath={PATHS.admin}>관리</TopNav.Text>
          </>
        }
      />
      <Footer />
    </MainLayout>
  );
};

export default EventPageLoading;
