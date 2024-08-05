/** @jsxImportSource @emotion/react */

import type {Preview} from '@storybook/react';
import {HDesignProvider} from '../src/theme/HDesignProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      defaultViewport: {
        styles: {
          width: '375px',
          height: '812px',
        },
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'gray',
          value: '#f3f3f3',
        },
      ],
    },
  },
  decorators: [
    Story => (
      <HDesignProvider>
        <Story />
      </HDesignProvider>
    ),
  ],
};

export default preview;
