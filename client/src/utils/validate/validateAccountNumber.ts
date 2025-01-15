import {ERROR_MESSAGE} from '@constants/errorMessage';
import REGEXP from '@constants/regExp';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

export const cleanedFormatAccountNumber = (accountNumber: string) => accountNumber.replace(/[-\s]/g, '');

const validateAccountNumber = (accountNumber: string): Pick<ValidateResult, 'errorMessage'> => {
  const accountNumberLength = cleanedFormatAccountNumber(accountNumber).length;

  const isValidateFormat = () => {
    return REGEXP.accountNumber.test(accountNumber);
  };

  const isValidateLength = () => {
    return accountNumberLength >= RULE.minAccountNumberLength && accountNumberLength <= RULE.maxAccountNumberLength;
  };

  const getErrorMessage = () => {
    if (!isValidateFormat()) return ERROR_MESSAGE.accountNumberFormat;
    if (!isValidateLength()) return ERROR_MESSAGE.accountNumberLength;
    return null;
  };

  return {errorMessage: getErrorMessage()};
};

export default validateAccountNumber;
