const EVENT = '/event';
const EVENT_WITH_EVENT_ID = `${EVENT}/:eventId`;

export const ROUTER_URLS = {
  main: '/',
  createGuestEvent: `${EVENT}/create/guest`,
  createMemberEvent: `${EVENT}/create/member`,
  eventManage: `${EVENT_WITH_EVENT_ID}/admin`,
  home: `${EVENT_WITH_EVENT_ID}/home`,
  member: `${EVENT_WITH_EVENT_ID}/admin/member`,
  addBill: `${EVENT_WITH_EVENT_ID}/admin/add-bill`,
  editBill: `${EVENT_WITH_EVENT_ID}/admin/edit-bill`,
  eventEdit: `${EVENT_WITH_EVENT_ID}/admin/edit`,
  images: `${EVENT_WITH_EVENT_ID}/images`,
  addImages: `${EVENT_WITH_EVENT_ID}/admin/add-images`,
  send: `${EVENT_WITH_EVENT_ID}/:memberId/send`,
  qrCode: `${EVENT_WITH_EVENT_ID}/qrcode`,
  event: EVENT,
  login: '/login',
  myPage: '/mypage',
  guestEventLogin: `${EVENT_WITH_EVENT_ID}/admin/guest/login`,
  memberEventLogin: `${EVENT_WITH_EVENT_ID}/admin/member/login`,
  kakaoLoginRedirectUri: process.env.KAKAO_REDIRECT_URI,
};
