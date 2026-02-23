import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { CustomSwitcher } from './CustomSwitcher';

export default {
  title: 'Basic Variants/Primary',
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

// Primary Variant

const optionsPrimary = [
  {
    label: 'Bad',
    value: 'bad',
    color: '#eb4900',
  },
  {
    label: 'Average',
    value: 'average',
    color: '#ebc041',
  },
  {
    label: 'OK',
    value: 'ok',
    color: '#0098eb',
  },
  {
    label: 'Good',
    value: 'nice',
    color: '#00db79',
  },
  {
    label: 'Excellent!',
    value: 'excellent',
    color: '#98e000',
  },
];

export const Primary = Template.bind({});

Primary.args = {
  options: optionsPrimary,
  containerWidth: 300,
  value: optionsPrimary[2].value,
  dragEnabled: true,
  callback: fn(),
};

export const PrimaryDisabled = Template.bind({});

PrimaryDisabled.args = {
  options: optionsPrimary,
  disabled: true,
  containerWidth: 300,
  value: optionsPrimary[2].value,
  dragEnabled: true,
  callback: fn(),
};
