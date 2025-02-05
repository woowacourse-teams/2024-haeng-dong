import HStack from '@components/Design/components/Stack/HStack';
import {BankAccount} from 'types/serviceType';

import {Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import BANKS, {BankIconId} from '@constants/bank';

export const AccountView = ({bankName, accountNumber}: BankAccount) => {
  const bankIconId: BankIconId | undefined = BANKS.filter(bank => bank.name === bankName)[0]?.iconId;

  return (
    <HStack gap={8}>
      {accountNumber === '' ? (
        <Text size="smallBodyBold">{`기본 계좌번호를 설정하여\n 행사마다 입력하는 번거로움을 줄이세요`}</Text>
      ) : (
        <>
          {bankIconId && <img src={getImageUrl(`bankIcon/${bankIconId}`, 'svg')} alt={bankIconId} width={28} />}
          <Text size="bodyBold" color="black">
            {accountNumber}
          </Text>
        </>
      )}
    </HStack>
  );
};
