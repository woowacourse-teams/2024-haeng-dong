const isArraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  // 배열을 정렬한 후 비교
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();

  // 값은 모두 같으나 순서를 변경했을 시, false를 반환한다.
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false;
  }

  return true;
};

export default isArraysEqual;
