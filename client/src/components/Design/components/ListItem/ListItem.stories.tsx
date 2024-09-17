/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import ListItem from '@HDcomponents/ListItem/ListItem';
import Text from '../Text/Text';
import Amount from '../Amount/Amount';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    return (
      <div style={{width: '400px'}}>
        <ListItem>
          <ListItem.Row>
            <Text size="bodyBold">뽕쟁이 족발</Text>
            <Amount amount={112000} />
          </ListItem.Row>
        </ListItem>
      </div>
    );
  },
};
