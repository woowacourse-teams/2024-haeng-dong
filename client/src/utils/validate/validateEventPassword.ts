import ERROR_MESSAGE from '@constants/errorMessage';

import {ValidateResult} from './type';
import REGEXP from '@constants/regExp';

const validateEventPassword = (password: string): ValidateResult => {
  if (!REGEXP.eventPassword.test(password)) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.eventPasswordType};
  }
  return {isValid: true};
};

export default validateEventPassword;
