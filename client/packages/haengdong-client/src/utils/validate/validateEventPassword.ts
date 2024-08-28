import {ERROR_MESSAGE} from '@constants/errorMessage';
import REGEXP from '@constants/regExp';

import {ValidateResult} from './type';

const validateEventPassword = (password: string): ValidateResult => {
  if (!REGEXP.eventPassword.test(password)) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.eventPasswordType};
  }
  return {isValid: true, errorMessage: null};
};

export default validateEventPassword;
