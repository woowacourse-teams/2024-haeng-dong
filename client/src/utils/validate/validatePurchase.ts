import {useState} from 'react';

import ERROR_MESSAGE from '@constants/errorMessage';
import RULE from '@constants/rule';
import REGEXP from '@constants/regExp';

import {ValidateResult} from './type';

const validatePurchase = (inputPair: Bill): ValidateResult => {
  const [error, setError] = useState('');
  const {title, price} = inputPair;

  const validatePrice = () => {
    if (price > RULE.maxPrice) {
      setError(ERROR_MESSAGE.purchasePrice);
      return false;
    }
    return true;
  };

  const validateTitle = () => {
    if (REGEXP.purchaseTitle.test(title)) {
      setError(ERROR_MESSAGE.purchaseTitle);
      return false;
    }
    return true;
  };

  if (validatePrice() && validateTitle()) {
    return {isValid: true};
  }
  return {isValid: false, errorMessage: error};
};

export default validatePurchase;
