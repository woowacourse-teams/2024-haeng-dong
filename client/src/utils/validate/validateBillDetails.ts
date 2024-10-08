import {ERROR_MESSAGE} from '@constants/errorMessage';
import RULE from '@constants/rule';

import {ValidateResult} from './type';

const validateBillDetails = (price: string, totalPrice: number): ValidateResult => {
  let errorMessage = null;
  const numberTypePrice = Number(price);

  const validateOnlyNaturalNumber = () => {
    if (!(Number.isInteger(numberTypePrice) && numberTypePrice >= 0)) return false;
    return true;
  };

  const validatePrice = () => {
    if (numberTypePrice > RULE.maxPrice) return false;
    return true;
  };

  const validateUnderTotalPrice = () => {
    if (numberTypePrice > totalPrice) return false;

    return true;
  };

  if (validateOnlyNaturalNumber() && validatePrice() && validateUnderTotalPrice()) {
    return {isValid: true, errorMessage: null};
  }

  return {isValid: false, errorMessage: errorMessage || ERROR_MESSAGE.invalidInput};
};

export default validateBillDetails;
