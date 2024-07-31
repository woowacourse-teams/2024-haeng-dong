import {ValidateResult} from './type';
import ERROR_MESSAGE from '@constants/errorMessage';

const validateEventName = (name: string): ValidateResult => {
  if (name.length > 30) {
    return {isValid: false, errorMessage: ERROR_MESSAGE.eventName};
  }
  return {isValid: true};
};

export default validateEventName;
