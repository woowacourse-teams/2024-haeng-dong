/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import {reactRouterParameters, withRouter} from 'storybook-addon-react-router-v6';

import TopNav from '@HDcomponents/TopNav/TopNav';

const meta = {
  title: 'Components/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: {
          eventId: '123123',
        },
      },
      routing: {path: '/event/:eventId/home'},
    }),
    // layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof TopNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
