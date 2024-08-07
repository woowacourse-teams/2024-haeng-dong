import {MainLayout, Title} from 'haengdong-design';

// TODO: (@weadie) 임시 에러 페이지입니다.
const ErrorPage = () => {
  return (
    <MainLayout>
      <Title title="알 수 없는 오류입니다." description="오류가 난 상황에 대해 {메일}로 연락주시면 소정의 상품을..." />
    </MainLayout>
  );
};

export default ErrorPage;
