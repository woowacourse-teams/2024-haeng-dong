const REGEXP = {
  eventPassword: /^[0-9]*$/,
  memberName: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]*$/,
  purchaseTitle: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]*$/,
  eventUrl: /\/event\/([a-zA-Z0-9-]+)\//,
  billTitle: /^([ㄱ-ㅎ가-힣a-zA-Z0-9ㆍᆢ]\s?)*$/,
};

export default REGEXP;
