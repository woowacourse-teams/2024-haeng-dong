import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import BankSelectModal from '@components/Modal/BankSelectModal/BankSelectModal';
import {BankAccount, BankName} from 'types/serviceType';

import useAccount from '@hooks/useAccount';
import useAmplitude from '@hooks/useAmplitude';

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
  const {trackSetBankName} = useAmplitude();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const accountInputRef = useRef<HTMLInputElement>(null);

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
    trackSetBankName(bankName);

    navigate(redirectUrlOnSubmit);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    if (document.activeElement?.tagName !== 'BODY') {
      accountInputRef.current?.focus();
    }
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      />
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
            onFocus={() => setIsBottomSheetOpen(true)}
          />
          <Input
            ref={accountInputRef}
            labelText="계좌번호"
            placeholder="ex) 030302-04-191806"
            errorText={accountNumberErrorMessage}
            isError={accountNumberErrorMessage !== null}
            value={accountNumber ?? ''}
            onChange={handleAccountOnTyping}
            onPaste={handleAccountOnPaste}
            autoFocus={false}
          />
          <BankSelectModal
            isBottomSheetOpened={isBottomSheetOpen}
            onClose={handleCloseBottomSheet}
            selectBank={selectBank}
          />
        </Flex>
      </FunnelLayout>
      <FixedButton disabled={!canSubmit} onClick={enrollAccountAndRedirectTo} onBackClick={() => navigate(-1)}>
        확인
      </FixedButton>
    </MainLayout>
  );
};

export default EditAccountPageView;
