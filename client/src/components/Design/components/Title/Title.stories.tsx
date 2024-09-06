import type {Meta, StoryObj} from '@storybook/react';

import Title from '@HDcomponents/Title/Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      description: '',
      control: {type: 'text'},
    },
    description: {
      description: '',
      control: {type: 'text'},
    },
    price: {
      description: '',
      control: {type: 'number'},
    },
  },
  args: {
    title: '페이지 제목이에요',
    description: `이곳에는 페이지 설명이 들어가요.
    페이지에 대한 설명을 자세하게 적어주면 좋아요 :)`,
    price: 100000,
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
