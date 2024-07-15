import React from 'react';

import type {Preview} from '@storybook/react';
import {HDesignProvider} from '../lib/theme/HDesignProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
