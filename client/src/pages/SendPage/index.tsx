import {useNavigate} from 'react-router-dom';

import useSendPage from '@hooks/useSendPage';

import {FixedButton, FunnelLayout, MainLayout, Select, Text, Top, TopNav} from '@components/Design';

const SendPage = () => {
  const {topMessage, selectProps, selectResult} = useSendPage();
  const {accountText, amountText} = topMessage;
  const {sendMethod, sendMethodIntroduceText, buttonOnClick, buttonText} = selectResult;

  const navigate = useNavigate();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text={accountText} />
          <Top.Line text={amountText} emphasize={[amountText]} />
        </Top>
        <Select labelText="송금 방법 선택" placeholder="송금 방법 선택" {...selectProps} />
        <Text size="body" textColor="gray">
          {sendMethodIntroduceText[sendMethod]}
        </Text>
        <FixedButton onBackClick={() => navigate(-1)} onClick={buttonOnClick[sendMethod]}>
          {buttonText[sendMethod]}
        </FixedButton>
      </FunnelLayout>
    </MainLayout>
  );
};

export default SendPage;
