import {ERROR_MESSAGE} from '@constants/errorMessage';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateEventName = (name: string): ValidateResult => {
  if (name.length > RULE.maxEventNameLength) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.eventName};
  }

  return {isValid: true, errorMessage: null};
};

export default validateEventName;
