/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import IconButton from '@HDcomponents/IconButton/IconButton';
import Icon from '@components/Design/components/Icon/Icon';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      description: '',
      control: {type: 'select'},
      options: ['large', 'medium', 'small'],
    },
    variants: {
      description: '',
      control: {type: 'select'},
      options: ['none', 'primary', 'secondary', 'tertiary', 'destructive'],
    },
    children: {
      description: '',
      control: {type: 'select'},
      // TODO: (@todari) : Icon의 색상을 variants에 의해 자동으로 변경해 줄 수 있는 로직 추가
      options: [
        <Icon iconType="inputDelete" />,
        <Icon iconType="rightChevron" />,
        <Icon iconType="search" />,
        <Icon iconType="confirm" />,
        <Icon iconType="error" />,
        <Icon iconType="trash" />,
      ],
    },
  },
  args: {
    size: 'medium',
    variants: 'destructive',
    children: <Icon iconType="trash" />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
