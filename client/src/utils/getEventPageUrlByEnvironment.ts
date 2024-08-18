import {ROUTER_URLS} from '@constants/routerUrls';

type EventPageTab = 'home' | 'admin';

const getEventPageUrlByEnvironment = (eventId: string, tab: EventPageTab) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return `https://${isDevelopment ? 'dev.' : ''}haengdong.pro${ROUTER_URLS.event}/${eventId}/${tab}`;
};

export default getEventPageUrlByEnvironment;
