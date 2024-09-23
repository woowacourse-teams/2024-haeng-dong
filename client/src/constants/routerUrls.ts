export const ROUTER_URLS = {
  main: '/',
  createEvent: '/event/create/',
  eventCreateComplete: '/event/create/complete',
  event: '/event', // TODO: (@weadie) baseurl을 어떻게 관리할 것인가?
  eventLogin: '/event/:eventId/login',
  eventManage: '/event/:eventId/admin',
  home: '/event/:eventId/home',
  addBill: 'event/:eventId/addBill',
};
