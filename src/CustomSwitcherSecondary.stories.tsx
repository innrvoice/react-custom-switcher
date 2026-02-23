import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { CustomSwitcher } from './CustomSwitcher';

export default {
  title: 'Basic Variants/Secondary',
  component: CustomSwitcher,

  parameters: {
    backgrounds: {
      options: {
        light: { name: 'light', value: '#FFFFFF' },
        dark: { name: 'dark', value: '#111111' },
      },
    },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Roboto, sans-serif',
        }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof CustomSwitcher> = (args) => <CustomSwitcher {...args} />;

// Secondary Variant

const optionsSecondary = [
  {
    label: '10',
    value: '10',
    color: '#b55a01',
  },
  {
    label: '20',
    value: '20',
    color: '#bd5d01',
  },
  {
    label: '30',
    value: '30',
    color: '#da6c01',
  },
  {
    label: '40',
    value: '40',
    color: '#f17802',
  },
  {
    label: '50',
    value: '50',
    color: '#ff8a00',
  },
];

export const Secondary = Template.bind({});

Secondary.args = {
  options: optionsSecondary,
  containerWidth: 240,
  value: optionsSecondary[0].value,
  variant: 'secondary',
  callback: fn(),
};

export const SecondaryDisabled = Template.bind({});

SecondaryDisabled.args = {
  options: optionsSecondary,
  containerWidth: 240,
  value: 'hm',
  disabled: true,
  variant: 'secondary',
  callback: fn(),
};
