/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import {reactRouterParameters, withRouter} from 'storybook-addon-react-router-v6';

import TopNav from '@HDcomponents/TopNav/TopNav';

import Switch from '../Switch/Switch';

import Back from './Back';

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
  argTypes: {
    children: {
      description: '',
      control: {type: 'select'},
      options: ['Back', 'Switch', 'Any'],
      mapping: {
        Back: <Back />,
        Switch: <Switch values={['홈', '관리']} value="홈" onChange={value => console.log(value)} />,
        Any: <div />,
      },
    },
  },
  args: {
    children: 'Back',
  },
} satisfies Meta<typeof TopNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
