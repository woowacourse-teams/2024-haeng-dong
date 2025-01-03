/** @jsxImportSource @emotion/react */
import type {Meta, StoryObj} from '@storybook/react';

import {COLORS} from '@components/Design/token/colors';

import {IconCheck} from './Icons/IconCheck';
import {IconChevron} from './Icons/IconChevron';
import {IconConfirmCircle} from './Icons/IconConfirmCircle';
import {IconEdit} from './Icons/IconEdit';
import {IconErrorCircle} from './Icons/IconErrorCircle';
import {IconKakao} from './Icons/IconKakao';
import {IconMeatballs} from './Icons/IconMeatballs';
import {IconPictureSquare} from './Icons/IconPictureSquare';
import {IconSearch} from './Icons/IconSearch';
import {IconTrash} from './Icons/IconTrash';
import {IconXCircle} from './Icons/IconXCircle';

const meta: Meta<
  typeof IconCheck | typeof IconChevron | typeof IconConfirmCircle | typeof IconEdit | typeof IconErrorCircle
> = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(COLORS),
    },
    size: {
      control: {type: 'number'},
    },
    width: {
      control: {type: 'number'},
    },
    height: {
      control: {type: 'number'},
    },
  },
};

export default meta;

type Story = StoryObj<
  | typeof IconCheck
  | typeof IconChevron
  | typeof IconConfirmCircle
  | typeof IconEdit
  | typeof IconErrorCircle
  | typeof IconPictureSquare
>;

const IconShowcase = ({IconComponent, args}: {IconComponent: any; args: any}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <IconComponent {...args} size={16} />
      <IconComponent {...args} size={24} />
      <IconComponent {...args} size={32} />
      <IconComponent {...args} size={48} />
    </div>
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <IconComponent {...args} color="black" />
      <IconComponent {...args} color="gray" />
      <IconComponent {...args} color="tertiary" />
      <IconComponent {...args} color="primary" />
    </div>
    {IconComponent.name === 'IconChevron' && (
      <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <IconComponent {...args} direction="left" />
        <IconComponent {...args} direction="right" />
        <IconComponent {...args} direction="up" />
        <IconComponent {...args} direction="down" />
      </div>
    )}
  </div>
);

export const Check: Story = {
  render: (args: React.ComponentProps<typeof IconCheck>) => <IconShowcase IconComponent={IconCheck} args={args} />,
};

export const Chevron: Story = {
  render: (args: React.ComponentProps<typeof IconChevron>) => <IconShowcase IconComponent={IconChevron} args={args} />,
};

export const Confirm: Story = {
  render: (args: React.ComponentProps<typeof IconConfirmCircle>) => (
    <IconShowcase IconComponent={IconConfirmCircle} args={args} />
  ),
};

export const Edit: Story = {
  render: (args: React.ComponentProps<typeof IconEdit>) => <IconShowcase IconComponent={IconEdit} args={args} />,
};

export const Error: Story = {
  render: (args: React.ComponentProps<typeof IconErrorCircle>) => (
    <IconShowcase IconComponent={IconErrorCircle} args={args} />
  ),
};

export const X: Story = {
  render: (args: React.ComponentProps<typeof IconXCircle>) => <IconShowcase IconComponent={IconXCircle} args={args} />,
};

export const Kakao: Story = {
  render: (args: React.ComponentProps<typeof IconKakao>) => <IconShowcase IconComponent={IconKakao} args={args} />,
};

export const Meatballs: Story = {
  render: (args: React.ComponentProps<typeof IconMeatballs>) => (
    <IconShowcase IconComponent={IconMeatballs} args={args} />
  ),
};

export const Picture: Story = {
  render: (args: React.ComponentProps<typeof IconPictureSquare>) => (
    <IconShowcase IconComponent={IconPictureSquare} args={args} />
  ),
};

export const Search: Story = {
  render: (args: React.ComponentProps<typeof IconSearch>) => <IconShowcase IconComponent={IconSearch} args={args} />,
};

export const Trash: Story = {
  render: (args: React.ComponentProps<typeof IconTrash>) => <IconShowcase IconComponent={IconTrash} args={args} />,
};
