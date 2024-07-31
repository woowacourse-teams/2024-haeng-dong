import REGEXP from '@constants/regExp';
import {ValidateResult} from './type';
import ERROR_MESSAGE from '@constants/errorMessage';

const validateMemberName = (name: string): ValidateResult => {
  if (!REGEXP.memberName.test(name)) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.memberName};
  }
  return {isValid: true};
};

export default validateMemberName;
