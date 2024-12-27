import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import BankSelectModal from '@components/Modal/BankSelectModal/BankSelectModal';
import {BankAccount, BankName} from 'types/serviceType';

import useAccount from '@hooks/useAccount';

import {FixedButton, Flex, FunnelLayout, Input, MainLayout, Top, TopNav} from '@components/Design';

type EditAccountPageProps = {
  bankName: BankName;
  accountNumber: string;
  onSubmit: (args: Partial<BankAccount>) => Promise<void>;
  redirectUrlOnSubmit: string;
};

const EditAccountPageView = ({
  bankName: defaultBankName,
  accountNumber: defaultAccountNumber,
  onSubmit,
  redirectUrlOnSubmit,
}: EditAccountPageProps) => {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const {
    bankName,
    accountNumber,
    accountNumberErrorMessage,
    canSubmit,
    selectBank,
    handleAccountOnTyping,
    handleAccountOnPaste,
    enrollAccount,
  } = useAccount({
    bankName: defaultBankName,
    accountNumber: defaultAccountNumber,
    onSubmit,
  });

  const enrollAccountAndRedirectTo = async () => {
    await enrollAccount();

    navigate(redirectUrlOnSubmit);
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text="행사 정산 금액은" />
          <Top.Line text="어떤 계좌로 받을까요?" emphasize={['어떤 계좌']} />
        </Top>
        <Flex flexDirection="column" gap="1rem">
          <Input
            labelText="은행"
            placeholder="은행을 선택해주세요"
            value={bankName ?? ''}
            errorText={null}
            autoFocus={false}
            readOnly
            onClick={() => setIsBottomSheetOpen(true)}
          />
          <Input
            labelText="계좌번호"
            placeholder="ex) 030302-04-191806"
            errorText={accountNumberErrorMessage}
            isError={accountNumberErrorMessage !== null}
            value={accountNumber ?? ''}
            onChange={handleAccountOnTyping}
            onPaste={handleAccountOnPaste}
            autoFocus={false}
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
      <FixedButton disabled={!canSubmit} onClick={enrollAccountAndRedirectTo} onBackClick={() => navigate(-1)}>
        확인
      </FixedButton>
    </MainLayout>
  );
};

export default EditAccountPageView;
