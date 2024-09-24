export let eventData = {
  eventName: '행동대장 야유회',
  bankName: '',
  accountNumber: '000000-01-121212',
};

export let memberData = {
  members: [
    {id: 1, name: '망쵸', isDeposited: false},
    {id: 2, name: '백호', isDeposited: true},
    {id: 3, name: '감자', isDeposited: true},
    {id: 4, name: '이상', isDeposited: false},
    {id: 5, name: '소하', isDeposited: false},
    {id: 6, name: '웨디', isDeposited: false},
    {id: 7, name: '쿠키', isDeposited: false},
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
    {
      bills: [{id: 4, title: '뽕쟁이족', price: 70000, isFixed: false}],
      members: [
        {id: 1, name: '망쵸'},
        {id: 2, name: '백호'},
        {id: 3, name: '감자'},
        {id: 4, name: '이상'},
        {id: 5, name: '소하'},
        {id: 6, name: '웨디'},
        {id: 7, name: '쿠키'},
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
        isFixed: false,
      },
      {
        id: 2,
        memberName: '백호',
        price: 5000,
        isFixed: false,
      },
    ],
  },
  '2': {
    billDetails: [
      {
        id: 1,
        memberName: '망쵸',
        price: 10000,
        isFixed: false,
      },
      {
        id: 2,
        memberName: '백호',
        price: 10000,
        isFixed: false,
      },
    ],
  },
  '3': {
    billDetails: [
      {
        id: 1,
        memberName: '망쵸',
        price: 5000,
        isFixed: false,
      },
      {
        id: 2,
        memberName: '백호',
        price: 10000,
        isFixed: true,
      },
      {
        id: 2,
        memberName: '감자',
        price: 5000,
        isFixed: false,
      },
    ],
  },
  '4': {
    billDetails: [
      {id: 1, memberName: '망쵸', price: 10000, isFixed: false},
      {id: 2, memberName: '백호', price: 10000, isFixed: false},
      {id: 3, memberName: '감자', price: 10000, isFixed: false},
      {id: 4, memberName: '이상', price: 10000, isFixed: false},
      {id: 5, memberName: '소하', price: 10000, isFixed: false},
      {id: 6, memberName: '웨디', price: 10000, isFixed: false},
      {id: 7, memberName: '쿠키', price: 10000, isFixed: false},
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
