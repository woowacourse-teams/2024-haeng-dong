/** @jsxImportSource @emotion/react */
import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {reactRouterParameters, withRouter} from 'storybook-addon-react-router-v6';

import TopNav from '@components/TopNav/TopNav';
import Back from './Back';
import Switch from '../Switch/Switch';

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
        Any: <div></div>,
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
