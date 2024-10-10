import {Link} from 'react-router-dom';

import {useTheme, Text} from '@components/Design';

import {footerStyle} from './Footer.style';
import {FooterProps} from './Footer.type';

const Footer: React.FC<FooterProps> = () => {
  const {theme} = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer css={footerStyle(theme)}>
      <div className="footer-link-bundle">
        <a href="https://github.com/woowacourse-teams/2024-haeng-dong/wiki" target="_blank">
          행동대장 소개
        </a>
        {/* TODO: (@soha) 문의 페이지 링크로 꼭!! 추후 수정 */}
        <Link to={'/'}>문의하기</Link>
        <a href="mailto:haengdongdj@gmail.com">이메일</a>
      </div>
      <Text size="tiny" textColor="gray">
        © {year} Copyright 행동대장
      </Text>
    </footer>
  );
};

export default Footer;
