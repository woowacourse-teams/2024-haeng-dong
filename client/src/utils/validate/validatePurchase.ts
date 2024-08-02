import ERROR_MESSAGE from '@constants/errorMessage';
import RULE from '@constants/rule';
import REGEXP from '@constants/regExp';

import {ValidateResult} from './type';

/**
 * TODO: (@soha) 이 함수를 만드신 분께..(웨디가)
 * 함수 안에서는 state를 사용할 수 없어용. 그래서 상태를 제거하였습니다.
 * 하지만 로직을 깊이 볼 시간이 없어 대충만 만져놓았습니다.
 *
 * 혹시 문제가 있다면 수정 부탁드립니다.
 */

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
