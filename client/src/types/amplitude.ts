import AmplitudeClient from '@amplitude/analytics-types';

export interface Amplitude {
  add: (
    plugin: AmplitudeClient.Plugin<AmplitudeClient.BrowserClient, AmplitudeClient.BrowserConfig>,
  ) => AmplitudeClient.AmplitudeReturn<void>;
  extendSession: () => void;
  flush: () => AmplitudeClient.AmplitudeReturn<void>;
  getDeviceId: () => string | undefined;
  getSessionId: () => number | undefined;
  getUserId: () => string | undefined;
  groupIdentify: (
    groupType: string,
    groupName: string | string[],
    identify: AmplitudeClient.Identify,
    eventOptions?: AmplitudeClient.EventOptions | undefined,
  ) => AmplitudeClient.AmplitudeReturn<AmplitudeClient.Result>;
  identify: (
    identify: AmplitudeClient.Identify,
    eventOptions?: AmplitudeClient.EventOptions | undefined,
  ) => AmplitudeClient.AmplitudeReturn<AmplitudeClient.Result>;
  init: {
    (apiKey: string, options?: AmplitudeClient.BrowserOptions | undefined): AmplitudeClient.AmplitudeReturn<void>;
    (
      apiKey: string,
      userId?: string | undefined,
      options?: AmplitudeClient.BrowserOptions | undefined,
    ): AmplitudeClient.AmplitudeReturn<void>;
  };
  logEvent: (
    eventInput: string | AmplitudeClient.BaseEvent,
    eventProperties?: Record<string, any> | undefined,
    eventOptions?: AmplitudeClient.EventOptions | undefined,
  ) => AmplitudeClient.AmplitudeReturn<AmplitudeClient.Result>;
  remove: (pluginName: string) => AmplitudeClient.AmplitudeReturn<void>;
  reset: () => void;
  revenue: (
    revenue: AmplitudeClient.Revenue,
    eventOptions?: AmplitudeClient.EventOptions | undefined,
  ) => AmplitudeClient.AmplitudeReturn<AmplitudeClient.Result>;
  setDeviceId: (deviceId: string) => void;
  setGroup: (
    groupType: string,
    groupName: string | string[],
    eventOptions?: AmplitudeClient.EventOptions | undefined,
  ) => AmplitudeClient.AmplitudeReturn<AmplitudeClient.Result>;
  setOptOut: (optOut: boolean) => void;
  setSessionId: (sessionId: number) => void;
  setTransport: (transport: AmplitudeClient.TransportType) => void;
  setUserId: (userId: string | undefined) => void;
  track: (
    eventInput: string | AmplitudeClient.BaseEvent,
    eventProperties?: Record<string, any> | undefined,
    eventOptions?: AmplitudeClient.EventOptions | undefined,
  ) => AmplitudeClient.AmplitudeReturn<AmplitudeClient.Result>;
}
