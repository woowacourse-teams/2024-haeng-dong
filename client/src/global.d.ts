declare module '*.svg';
declare module '*.png';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    // env keys
    readonly API_BASE_URL: string;
    readonly AMPLITUDE_KEY: string;
    readonly KAKAO_JAVASCRIPT_KEY: string;
    readonly IMAGE_URL: string;
  }
}
