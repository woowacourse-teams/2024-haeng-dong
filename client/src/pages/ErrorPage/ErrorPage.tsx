import {Back, Flex, MainLayout, Title, TopNav} from 'haengdong-design';

// import errorPageIcon from '../../assets/error_page_icon.png';

// TODO: (@weadie) 임시 에러 페이지입니다.
const ErrorPage = () => {
  return (
    <MainLayout>
      <Title title="알 수 없는 오류입니다." description="오류가 난 상황에 대해 {메일}로 연락주시면 소정의 상품을..." />
      {/* <Flex width="100%" justifyContent="center"> */}
      {/* <img src={errorPageIcon} height="100" width="100" alt="Error Icon"></img> */}
      {/* </Flex> */}
    </MainLayout>
  );
};

export default ErrorPage;
