import useAmplitude from '@hooks/useAmplitude';

import {MainLayout} from '@HDesign/index';

import Nav from './Nav/Nav';
import MainSection from './Section/MainSection';
import DescriptionSection from './Section/DescriptionSection';
import AddBillSection from './Section/AddBillSection';
import AddMemberSection from './Section/AddMemberSection';
import ReportSection from './Section/ReportSection';

const MainPage = () => {
  const {trackStartCreateEvent} = useAmplitude();

  return (
    <MainLayout>
      <Nav trackStartCreateEvent={trackStartCreateEvent} />
      <MainSection trackStartCreateEvent={trackStartCreateEvent} />
      <DescriptionSection />
      <AddBillSection />
      <AddMemberSection />
      <ReportSection />
    </MainLayout>
  );
};

export default MainPage;
