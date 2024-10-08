import {useNavigate} from 'react-router-dom';

import useSendPage from '@hooks/useSendPage';

import {FixedButton, FunnelLayout, MainLayout, Select, Text, Top, TopNav} from '@components/Design';

const SendPage = () => {
  const {sendMethod, sendMethodIntroduceText, buttonText, buttonOnClick, onSelect, accountText, amountText} =
    useSendPage();
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
        <Select
          labelText="송금 방법 선택"
          placeholder="송금 방법 선택"
          defaultValue={'토스'}
          options={['토스', '카카오페이', '복사하기']}
          onSelect={onSelect}
        />
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
