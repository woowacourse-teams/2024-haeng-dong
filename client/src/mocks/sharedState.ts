export let eventData = {
  eventName: '행동대장 야유회',
  bankName: 'KB국민은행',
  accountNumber: '000000-01-121212',
};

export let memberData = {
  members: [
    {id: 1, name: '망쵸', isDeposited: false},
    {id: 2, name: '백호', isDeposited: true},
    {id: 3, name: '감자', isDeposited: true},
  ],
};

export let billData = {
  steps: [
    {
      bills: [
        {id: 1, title: '커피', price: 10000, isFixed: false},
        {id: 2, title: '인생네컷', price: 20000, isFixed: false},
      ],
      members: [
        {id: 1, name: '망쵸'},
        {id: 2, name: '백호'},
      ],
    },
    {
      bills: [{id: 3, title: '맥주', price: 20000, isFixed: true}],
      members: [
        {id: 1, name: '망쵸'},
        {id: 2, name: '백호'},
        {id: 3, name: '감자'},
      ],
    },
  ],
};

export let billDetailsData = {
  '1': {
    billDetails: [
      {
        id: 1,
        memberName: '망쵸',
        price: 5000,
      },
      {
        id: 2,
        memberName: '백호',
        price: 5000,
      },
    ],
  },
  '2': {
    billDetails: [
      {
        id: 1,
        memberName: '망쵸',
        price: 10000,
      },
      {
        id: 2,
        memberName: '백호',
        price: 10000,
      },
    ],
  },
  '3': {
    billDetails: [
      {
        id: 1,
        memberName: '망쵸',
        price: 5000,
      },
      {
        id: 2,
        memberName: '백호',
        price: 10000,
      },
      {
        id: 2,
        memberName: '감자',
        price: 5000,
      },
    ],
  },
};

export let reportData = {
  reports: [
    {
      memberId: 1,
      name: '망쵸',
      price: 20000,
      isDeposited: false,
    },
    {
      memberId: 2,
      name: '백호',
      price: 25000,
      isDeposited: true,
    },
    {
      memberId: 3,
      name: '감자',
      price: 5000,
      isDeposited: true,
    },
  ],
};
