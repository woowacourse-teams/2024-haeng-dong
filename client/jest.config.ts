import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // testEnvironment: 'node', //  Node.js 모듈(fs, path, http 등)을 사용한 서버 사이드 로직이나 파일 시스템 접근, 네트워크 요청 등을 테스트
  testEnvironment: 'jsdom', // 브라우저 내에서의 JavaScript 동작을 모방하여, DOM 조작, 이벤트 핸들링, 브라우저 관련 API 호출
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/utils/',
    '<rootDir>/src/mocks/',
    '<rootDir>/src/apis/',
    '<rootDir>/src/request/',
    '<rootDir>/src/constants/',
    '<rootDir>/src/errors/',
    '<rootDir>/src/ErrorProvider.tsx',
  ],

  verbose: true,
  setupFiles: ['./jest.polyfills.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1', // path alias를 적용하기 위함
    '^@apis/(.*)$': '<rootDir>/src/apis/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@errors/(.*)$': '<rootDir>/src/errors/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
