import Top from '@components/Design/components/Top/Top';

import {MainLayout} from '@HDesign/index';

const ErrorPage = () => {
  return (
    <MainLayout>
      <Top>
        <Top.Line text="알 수 없는 오류입니다." emphasize={['알 수 없는 오류입니다.']} />
      </Top>
    </MainLayout>
  );
};

export default ErrorPage;
