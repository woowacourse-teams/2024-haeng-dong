import REGEXP from '@constants/regExp';
import ERROR_MESSAGE from '@constants/errorMessage';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateMemberName = (name: string): ValidateResult => {
  const validateOnlyString = () => {
    if (!REGEXP.memberName.test(name)) return false;
    return true;
  };

  const validateLength = () => {
    if (name.length > RULE.maxMemberNameLength || name.length < 1) return false;
    return true;
  };

  if (validateOnlyString() && validateLength()) {
    return {isValid: true};
  }

  return {isValid: false, errorMessage: ERROR_MESSAGE.memberName};
};

export default validateMemberName;
