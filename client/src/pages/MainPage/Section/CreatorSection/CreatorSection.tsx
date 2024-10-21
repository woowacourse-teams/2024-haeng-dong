import {css} from '@emotion/react';

import Text from '@components/Design/components/Text/Text';
import Avatar from './Avatar';
import {useNavigate} from 'react-router-dom';
import {avatarContainerStyle, partStyle, sectionStyle} from './CreatorSection.style';

const CreatorSection = () => {
  return (
    <div css={sectionStyle}>
      <Text size="subTitle" textColor="white" responsive={true}>
        행동대장을 만든 행동대장들
      </Text>
      <div css={partStyle}>
        <Text size="bodyBold" textColor="white" responsive={true}>
          FRONTEND
        </Text>
        <div css={avatarContainerStyle}>
          <Avatar imagePath="todari" name="토다리" onClick={() => window.open('https://github.com/Todari', '_blank')} />
          <Avatar
            imagePath="cookie"
            name="쿠키"
            onClick={() => window.open('https://github.com/jinhokim98', '_blank')}
          />
          <Avatar imagePath="soha" name="소하" onClick={() => window.open('https://github.com/soi-ha', '_blank')} />
          <Avatar imagePath="weadie" name="웨디" onClick={() => window.open('https://github.com/pakxe', '_blank')} />
        </div>
      </div>
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        })}
      >
        <Text size="bodyBold" textColor="white" responsive={true}>
          BACKEND
        </Text>
        <div css={avatarContainerStyle}>
          <Avatar
            imagePath="2sang"
            name="이상"
            onClick={() => window.open('https://github.com/kunsanglee', '_blank')}
          />
          <Avatar
            imagePath="baekho"
            name="백호"
            onClick={() => window.open('https://github.com/Arachneee', '_blank')}
          />
          <Avatar imagePath="mangcho" name="망쵸" onClick={() => window.open('https://github.com/3Juhwan', '_blank')} />
          <Avatar imagePath="gamja" name="감자" onClick={() => window.open('https://github.com/khabh', '_blank')} />
        </div>
      </div>
    </div>
  );
};

export default CreatorSection;
