/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import EditableItemInput from '@HDcomponents/EditableItem/EditableItem.Input';

import EditableItem from './EditableItem';
import {EditableItemProvider} from './EditableItem.context';

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
    value: '값',
  },
} satisfies Meta<typeof EditableItemInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    return (
      <EditableItemProvider>
        <EditableItem.Input {...args} />
      </EditableItemProvider>
    );
  },
};
