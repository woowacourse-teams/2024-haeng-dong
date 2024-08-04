/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import type {StorybookConfig} from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@components': path.resolve(__dirname, '../src/components'),
        '@token': path.resolve(__dirname, '../src/token'),
        '@types': path.resolve(__dirname, '../src/types'),
        '@theme': path.resolve(__dirname, '../src/theme'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@utils': path.resolve(__dirname, '../src/utils'),
      };
    }

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    const imageRule = config.module.rules.find(rule => rule?.['test']?.test('.svg'));
    if (imageRule) {
      imageRule['exclude'] = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
export default config;
