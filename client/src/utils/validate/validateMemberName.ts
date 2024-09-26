import REGEXP from '@constants/regExp';
import {ERROR_MESSAGE} from '@constants/errorMessage';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateMemberName = (name: string): ValidateResult => {
  let errorMessage = null;
  const validateOnlyString = () => {
    if (!REGEXP.memberName.test(name)) return false;
    return true;
  };

  const validateLength = () => {
    if (name.length > RULE.maxMemberNameLength) return false;
    return true;
  };

  if (validateOnlyString() && validateLength()) {
    return {isValid: true, errorMessage: null};
  }

  return {isValid: false, errorMessage: errorMessage || ERROR_MESSAGE.memberName};
};

export default validateMemberName;
