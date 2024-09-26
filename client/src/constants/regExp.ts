const REGEXP = {
  eventPassword: /^[0-9]*$/,
  eventUrl: /\/event\/([a-zA-Z0-9-]+)\//,
  billTitle: /^([ㄱ-ㅎ가-힣a-zA-Z0-9ㆍᆢ]\s?)*$/,
  memberName: /^([ㄱ-ㅎ가-힣a-zA-Zㆍᆢ]\s?)*$/,
  accountNumber: /^\d+([\s\-]\d+)*[\s\-]?$/,
};

export default REGEXP;
