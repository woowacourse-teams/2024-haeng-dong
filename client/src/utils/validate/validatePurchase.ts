import type {Bill} from 'types/serviceType';

import {ERROR_MESSAGE} from '@constants/errorMessage';
import RULE from '@constants/rule';
import REGEXP from '@constants/regExp';

import {ValidateResult} from './type';

const validatePurchase = (inputPair: Bill): ValidateResult => {
  const {title, price} = inputPair;
  let errorMessage: string | null = null;

  const errorInfo = {
    price: false,
    title: false,
  };

  const validatePrice = () => {
    if (price > RULE.maxPrice) {
      errorMessage = ERROR_MESSAGE.purchasePrice;
      errorInfo.price = true;
      return false;
    }

    errorInfo.price = false;
    return true;
  };

  const validateTitle = () => {
    if (!REGEXP.purchaseTitle.test(title)) {
      errorMessage = ERROR_MESSAGE.purchaseTitle;
      errorInfo.title = true;
      return false;
    }

    errorInfo.title = false;
    return true;
  };

  if (validatePrice() && validateTitle()) {
    return {isValid: true, errorMessage: null};
  }

  return {isValid: false, errorMessage, errorInfo};
};

export default validatePurchase;
