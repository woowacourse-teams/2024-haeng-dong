/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import LabelGroupInput from '@components/LabelGroupInput/LabelGroupInput';
import {useState} from 'react';

const meta = {
  title: 'Components/LabelGroupInput',
  component: LabelGroupInput,
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    labelText: {
      description: 'label에 들어갈 텍스트를 작성',
      control: {type: 'text'},
    },
    errorText: {
      description: 'error에 들어갈 텍스트를 작성',
      control: {type: 'text'},
    },
  },
  args: {
    labelText: '지출내역 / 금액',
    errorText: 'error가 발생했을 때 나타납니다!',
  },
} satisfies Meta<typeof LabelGroupInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({...args}) => {
    const [name, setName] = useState('');
    const [isError, setIsError] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length < 4) {
        setName(event.target.value);
        setIsError(false);
      } else {
        event.target.value = name;
        setIsError(true);
      }
    };
    const [price, setPrice] = useState('');
    return (
      <LabelGroupInput {...args}>
        <LabelGroupInput.Element
          key="name"
          placeholder="지출내역"
          value={name}
          onChange={handleChange}
          isError={isError}
        />
        <LabelGroupInput.Element
          value={price}
          onChange={e => setPrice(e.target.value)}
          key="price"
          placeholder="금액"
          isError={false}
        />
      </LabelGroupInput>
    );
  },
};
