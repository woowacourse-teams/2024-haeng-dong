import {ERROR_MESSAGE} from '@constants/errorMessage';
import REGEXP from '@constants/regExp';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateAccountNumber = (accountNumber: string): Pick<ValidateResult, 'errorMessage'> => {
  const slicedAccountNumber = accountNumber.slice(0, RULE.maxAccountNumberLength);

  const isValidateFormat = () => {
    return REGEXP.accountNumber.test(accountNumber);
  };

  const isValidateLength = () => {
    return (
      slicedAccountNumber.length >= RULE.minAccountNumberLength &&
      slicedAccountNumber.length <= RULE.maxAccountNumberLength
    );
  };

  const getErrorMessage = () => {
    if (!isValidateFormat()) return ERROR_MESSAGE.accountNumberFormat;
    if (!isValidateLength()) return ERROR_MESSAGE.accountNumberLength;
    return null;
  };

  return {errorMessage: getErrorMessage()};
};

export default validateAccountNumber;
