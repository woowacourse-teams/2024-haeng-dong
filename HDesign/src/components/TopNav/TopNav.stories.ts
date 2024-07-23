import type {Meta, StoryObj} from '@storybook/react';
import {reactRouterParameters, withRouter} from 'storybook-addon-react-router-v6';

import TopNav from '@components/TopNav/TopNav';
import Switch from '../Switch/Switch';

const meta = {
  title: 'Components/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: './',
    }),
    layout: 'centered',
  },
  argTypes: {
    navType: {
      description: '',
      control: {type: 'select', options: ['back', 'home']},
    },
  },
  args: {
    navType: 'back',
  },
} satisfies Meta<typeof TopNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
