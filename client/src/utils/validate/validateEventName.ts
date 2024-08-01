import ERROR_MESSAGE from '@constants/errorMessage';

import {ValidateResult} from './type';

const validateEventName = (name: string): ValidateResult => {
  if (name.length > 30) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.eventName};
  }
  return {isValid: true};
};

export default validateEventName;
