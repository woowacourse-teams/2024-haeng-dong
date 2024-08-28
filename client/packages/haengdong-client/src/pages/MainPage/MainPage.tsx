import {MainLayout} from 'haengdong-design';

import Nav from './Nav/Nav';
import MainSection from './Section/MainSection';
import DescriptionSection from './Section/DescriptionSection';
import AddBillSection from './Section/AddBillSection';
import AddMemberSection from './Section/AddMemberSection';
import MemberReportSection from './Section/MemberReportSection';

const MainPage = () => {
  return (
    <MainLayout>
      <Nav />
      <MainSection />
      <DescriptionSection />
      <AddBillSection />
      <AddMemberSection />
      <MemberReportSection />
    </MainLayout>
  );
};

export default MainPage;
