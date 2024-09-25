import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import BankSelectModal from '@components/Modal/BankSelectModal/BankSelectModal';

import useAccount from '@hooks/useAccount';

import {FixedButton, Flex, FunnelLayout, LabelInput, MainLayout, Top, TopNav} from '@components/Design';

import getDeletedLastPath from '@utils/getDeletedLastPath';

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const {bankName, accountNumber, canSubmit, selectBank, handleAccount, enrollAccount} = useAccount();

  const enrollAccountAndNavigateAdmin = async () => {
    await enrollAccount();
    navigate(getDeletedLastPath(location.pathname));
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Element displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text="행사 정산 금액은" />
          <Top.Line text="어떤 계좌로 받을까요?" emphasize={['어떤 계좌']} />
        </Top>
        <Flex flexDirection="column" gap="1rem">
          <LabelInput
            labelText="은행"
            placeholder="은행을 선택해주세요"
            value={bankName ?? ''}
            errorText={null}
            autoFocus={false}
            isAlwaysOnLabel
            isAlwaysOnInputBorder
            readOnly
            onClick={() => setIsBottomSheetOpen(true)}
          />
          <LabelInput
            labelText="계좌번호"
            placeholder="030302-04-191806"
            errorText={null}
            value={accountNumber ?? ''}
            onChange={handleAccount}
            autoFocus={false}
            isAlwaysOnLabel
            isAlwaysOnInputBorder
          />
          {isBottomSheetOpen && (
            <BankSelectModal
              isBottomSheetOpened={isBottomSheetOpen}
              setIsBottomSheetOpened={setIsBottomSheetOpen}
              selectBank={selectBank}
            />
          )}
        </Flex>
      </FunnelLayout>
      <FixedButton disabled={!canSubmit} onClick={enrollAccountAndNavigateAdmin} onBackClick={() => navigate(-1)}>
        확인
      </FixedButton>
    </MainLayout>
  );
};

export default Account;
