/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import EditableItemInput from '@components/EditableItem/EditableItem.Input';

import EditableItem from './EditableItem';
import {EditableItmProvider} from './EditableItem.context';

const meta = {
  title: 'Components/EditableItemInput',
  component: EditableItemInput,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    textSize: {
      description: '',
      control: {type: 'select'},
    },
    hasError: {
      description: '',
      control: {type: 'boolean'},
    },
  },
  args: {
    placeholder: '지출 내역',
    textSize: 'body',
    hasError: false,
    autoFocus: true,
  },
} satisfies Meta<typeof EditableItemInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    return (
      <EditableItmProvider>
        <EditableItem.Input {...args} />
      </EditableItmProvider>
    );
  },
};
