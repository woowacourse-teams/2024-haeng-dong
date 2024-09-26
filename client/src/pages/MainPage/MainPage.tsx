import {Flex, MainLayout} from '@HDesign/index';

import Nav from './Nav/Nav';
import MainSection from './Section/MainSection';
import DescriptionSection from './Section/DescriptionSection';
import AddBillSection from './Section/AddBillSection';
import AddMemberSection from './Section/AddMemberSection';
import ReportSection from './Section/ReportSection';

const MainPage = () => {
  return (
    <MainLayout>
      <Nav />
      <MainSection />
      <DescriptionSection />
      <AddBillSection />
      <AddMemberSection />
      <ReportSection />
    </MainLayout>
  );
};

export default MainPage;
