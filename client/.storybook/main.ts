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
        '@apis': path.resolve(__dirname, '../src/apis/'),
        '@assets': path.resolve(__dirname, '../src/assets/'),
        '@components': path.resolve(__dirname, '../src/components/'),
        '@constants': path.resolve(__dirname, '../src/constants/'),
        '@hooks': path.resolve(__dirname, '../src/hooks/'),
        '@store': path.resolve(__dirname, '../src/store/'),
        '@mocks': path.resolve(__dirname, '../src/mocks/'),
        '@pages': path.resolve(__dirname, '../src/pages/'),
        '@utils': path.resolve(__dirname, '../src/utils/'),
        '@errors': path.resolve(__dirname, '../src/errors/'),
        '@HDesign': path.resolve(__dirname, '../src/components/Design/'),
        '@HDcomponents': path.resolve(__dirname, '../src/components/Design/components/'),
        '@HDutils': path.resolve(__dirname, '../src/components/Design/utils/'),
        '@token': path.resolve(__dirname, '../src/components/Design/token/'),
        '@theme': path.resolve(__dirname, '../src/components/Design/theme/'),
        '@layouts': path.resolve(__dirname, '../src/components/Design/layouts/'),
        '@type': path.resolve(__dirname, '../src/components/Design/type/'),
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
