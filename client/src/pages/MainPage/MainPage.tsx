import useAmplitude from '@hooks/useAmplitude';

import Nav from './Nav/Nav';
import {MainSection} from './Section/MainSection';
import {DescriptionSection} from './Section/DescriptionSection';
import {FeatureSection} from './Section/FeatureSection';
import {mainContainer, navFixedStyle, navWrapperStyle} from './MainPage.style';

const MainPage = () => {
  const {trackStartCreateEvent} = useAmplitude();

  return (
    <div css={mainContainer}>
      <div css={navFixedStyle}>
        <div css={navWrapperStyle}>
          <Nav trackStartCreateEvent={trackStartCreateEvent} />
        </div>
      </div>
      <MainSection trackStartCreateEvent={trackStartCreateEvent} />
      <DescriptionSection />
      <FeatureSection />
    </div>
  );
};

export default MainPage;
