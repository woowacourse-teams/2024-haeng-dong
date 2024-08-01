import REGEXP from '@constants/regExp';
import ERROR_MESSAGE from '@constants/errorMessage';

import {ValidateResult} from './type';

const validateMemberName = (name: string): ValidateResult => {
  if (!REGEXP.memberName.test(name)) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.memberName};
  }
  return {isValid: true};
};

export default validateMemberName;
