import REGEXP from '@constants/regExp';
import {ERROR_MESSAGE} from '@constants/errorMessage';
import RULE from '@constants/rule';

const validateMemberName = (name: string) => {
  const slicedName = name.trim().slice(0, RULE.maxMemberNameLength);

  const validateOnlyString = () => {
    return REGEXP.memberName.test(slicedName);
  };

  const validateLength = () => {
    return slicedName.length > 0;
  };

  const getErrorMessage = () => {
    if (!validateOnlyString()) return ERROR_MESSAGE.memberNameFormat;
    if (name.length > RULE.maxMemberNameLength) return ERROR_MESSAGE.memberNameLength;
    return null;
  };

  return {
    memberName: slicedName,
    isValid: validateLength() && validateOnlyString(),
    errorMessage: getErrorMessage(),
  };
};

export default validateMemberName;
