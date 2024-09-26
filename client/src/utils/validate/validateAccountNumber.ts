import {ERROR_MESSAGE} from '@constants/errorMessage';
import REGEXP from '@constants/regExp';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateAccountNumber = (accountNumber: string): ValidateResult => {
  const isValidateType = () => {
    return REGEXP.accountNumber.test(accountNumber);
  };

  const isValidateLength = () => {
    return accountNumber.length >= RULE.minAccountNumberLength && accountNumber.length <= RULE.maxAccountNumberLength;
  };

  if (isValidateType() && isValidateLength()) {
    return {isValid: true, errorMessage: null};
  }

  return {isValid: false, errorMessage: ERROR_MESSAGE.invalidAccountNumber};
};

export default validateAccountNumber;
