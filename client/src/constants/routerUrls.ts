const EVENT = '/event';
const EVENT_WITH_EVENT_ID = `${EVENT}/:eventId`;
const LOUNGE = '/lounge';

export const ROUTER_URLS = {
  main: '/',
  event: EVENT,
  createGuestEvent: `${EVENT}/create/guest`,
  createUserEvent: `${EVENT}/create/user`,
  eventManage: `${EVENT_WITH_EVENT_ID}/admin`,
  home: `${EVENT_WITH_EVENT_ID}/home`,
  members: `${EVENT_WITH_EVENT_ID}/admin/members`,
  addBill: `${EVENT_WITH_EVENT_ID}/admin/add-bill`,
  editBill: `${EVENT_WITH_EVENT_ID}/admin/edit-bill`,
  editAccount: `${EVENT_WITH_EVENT_ID}/admin/edit-account`,
  editEventName: `${EVENT_WITH_EVENT_ID}/admin/edit-event-name`,
  images: `${EVENT_WITH_EVENT_ID}/images`,
  addImages: `${EVENT_WITH_EVENT_ID}/admin/add-images`,
  send: `${EVENT_WITH_EVENT_ID}/home/send`,
  billDetail: `${EVENT_WITH_EVENT_ID}/home/bill-detail`,
  qrCode: `${EVENT_WITH_EVENT_ID}/qrcode`,
  login: '/login',
  lounge: LOUNGE,
  createdEvents: `${LOUNGE}/events`,
  editUserAccount: `${LOUNGE}/edit-account`,
  editUserNickname: `${LOUNGE}/edit-nickname`,
  guestEventLogin: `${EVENT_WITH_EVENT_ID}/admin/login/guest`,
  userEventLogin: `${EVENT_WITH_EVENT_ID}/admin/login/user`,
  kakaoLoginRedirectUri: process.env.KAKAO_REDIRECT_URI,
};
