/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import IconButton from '@HDcomponents/IconButton/IconButton';
import {IconMeatballs} from '../Icons/Icons/IconMeatballs';
import {IconXCircle} from '../Icons/Icons/IconXCircle';
import {IconChevron} from '../Icons/Icons/IconChevron';
import {IconSearch} from '../Icons/Icons/IconSearch';
import {IconConfirmCircle} from '../Icons/Icons/IconConfirmCircle';
import {IconErrorCircle} from '../Icons/Icons/IconErrorCircle';
import {IconTrash} from '../Icons/Icons/IconTrash';

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
        <IconMeatballs />,
        <IconXCircle />,
        <IconChevron />,
        <IconSearch />,
        <IconConfirmCircle />,
        <IconErrorCircle />,
        <IconTrash />,
      ],
    },
  },
  args: {
    size: 'medium',
    variants: 'destructive',
    children: <IconTrash />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
