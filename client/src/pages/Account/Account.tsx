import {useState} from 'react';

import BankSelectModal from '@components/Modal/BankSelectModal/BankSelectModal';

import useAccount from '@hooks/useAccount';

import {Back, Button, LabelInput, MainLayout, Title, TopNav} from '@components/Design';

const Account = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const {bank, account, canSubmit, selectBank, handleAccount, enrollAccount} = useAccount();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
      {/* <Title title="계좌번호" description="행사에 사용한 계좌번호를 입력해주세요." /> */}
      <fieldset>
        <LabelInput
          labelText="은행"
          placeholder="은행을 선택해주세요"
          value={bank}
          errorText={null}
          autoFocus={false}
          readOnly
          onClick={() => setIsBottomSheetOpen(true)}
        />
        <LabelInput
          labelText="계좌번호"
          placeholder="030302-04-191806"
          errorText={null}
          value={account}
          onChange={handleAccount}
          autoFocus={false}
        />
        {isBottomSheetOpen && (
          <BankSelectModal
            isBottomSheetOpened={isBottomSheetOpen}
            setIsBottomSheetOpened={setIsBottomSheetOpen}
            selectBank={selectBank}
          />
        )}
      </fieldset>
      <Button disabled={!canSubmit} onClick={enrollAccount}>
        확인
      </Button>
    </MainLayout>
  );
};

export default Account;
