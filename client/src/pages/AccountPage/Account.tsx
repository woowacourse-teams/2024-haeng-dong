import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import BankSelectModal from '@components/Modal/BankSelectModal/BankSelectModal';

import useAccount from '@hooks/useAccount';

import {Back, FixedButton, Flex, FunnelLayout, LabelInput, MainLayout, Top, TopNav} from '@components/Design';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const Account = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const eventId = getEventIdByUrl();
  const {bankName, accountNumber, canSubmit, selectBank, handleAccount, enrollAccount} = useAccount();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
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
            value={bankName}
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
            value={accountNumber}
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
      <FixedButton disabled={!canSubmit} onClick={enrollAccount} onBackClick={() => navigate(-1)}>
        확인
      </FixedButton>
    </MainLayout>
  );
};

export default Account;
