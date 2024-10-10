const SESSION_STORAGE_KEYS = {
  closeAccountBannerByEventToken: (eventToken: string) => `closeAccountBanner-${eventToken}`,
} as const;

export default SESSION_STORAGE_KEYS;
