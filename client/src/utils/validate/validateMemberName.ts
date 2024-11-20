import REGEXP from '@constants/regExp';
import {ERROR_MESSAGE} from '@constants/errorMessage';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateMemberName = (name: string): ValidateResult => {
  let errorMessage = null;

  const validateOnlyString = () => {
    return REGEXP.memberName.test(name);
  };

  const validateLength = () => {
    return name.length <= RULE.maxMemberNameLength;
  };

  if (validateOnlyString() && validateLength()) {
    return {isValid: true, errorMessage: null};
  }

  return {isValid: false, errorMessage: errorMessage || ERROR_MESSAGE.memberName};
};

export default validateMemberName;
