import ERROR_MESSAGE from '@constants/errorMessage';
import RULE from '@constants/rule';
import REGEXP from '@constants/regExp';

import {ValidateResult} from './type';

const validatePurchase = (inputPair: Bill): ValidateResult => {
  const {title, price} = inputPair;
  let errorMessage;

  const validatePrice = () => {
    if (price > RULE.maxPrice) {
      errorMessage = ERROR_MESSAGE.purchasePrice;
      return false;
    }
    return true;
  };

  const validateTitle = () => {
    if (REGEXP.purchaseTitle.test(title)) {
      errorMessage = ERROR_MESSAGE.purchaseTitle;
      return false;
    }
    return true;
  };

  if (validatePrice() && validateTitle()) {
    return {isValid: true};
  }

  return {isValid: true, errorMessage: ''};
};

export default validatePurchase;
