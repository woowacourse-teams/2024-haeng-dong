/** @jsxImportSource @emotion/react */
import {useLocation, useNavigate} from 'react-router-dom';
import TextButton from '../TextButton/TextButton';
import {topNavNonStyle, topNavStyle} from './TopNav.style';
import {TopNavProps} from './TopNav.type';
import TopHomeNav from './TopHomeNav';

const TopNav = ({navType}: TopNavProps) => {
  const navigate = useNavigate();

  const TopNavByType = () => {
    switch (navType) {
      case 'back':
        return (
          <div css={topNavStyle}>
            <TextButton onClick={() => navigate(-1)} textSize="bodyBold" textColor="gray">
              뒤로가기
            </TextButton>
          </div>
        );

      case 'home':
        return <TopHomeNav />;

      default:
        return <div css={topNavNonStyle} />;
    }
  };

  return <TopNavByType />;
};

export default TopNav;
