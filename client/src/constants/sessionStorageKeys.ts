const SESSION_STORAGE_KEYS = {
  closeAccountBannerByEventToken: (eventToken: string) => `closeAccountBanner-${eventToken}`,
  closeDepositStateBannerByEventToken: (eventToken: string) => `closeDepositStateBanner-${eventToken}`,
  createdByGuest: 'createdByGuest',
  previousUrlForLogin: 'previousUrlForLogin',
  eventHomeTab: 'eventHomeTab',
} as const;

export default SESSION_STORAGE_KEYS;
