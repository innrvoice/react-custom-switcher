import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CustomSwitcher } from './CustomSwitcher';

export default {
  title: 'Basic Variants/Primary',
  component: CustomSwitcher,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#111111' },
      ],
    },
    layout: 'fullscreen',
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
    color: '#CC0000',
  },
  {
    label: 'Average',
    value: 'average',
    color: '#B94E00',
  },
  {
    label: 'OK',
    value: 'ok',
    color: '#406686',
  },
  {
    label: 'Nice',
    value: 'nice',
    color: '#447601',
  },
  {
    label: 'Excellent!',
    value: 'excellent',
    color: '#62AA00',
  },
];

export const Primary = Template.bind({});

Primary.args = {
  options: optionsPrimary,
  containerWidth: 300,
  value: optionsPrimary[2].value,
  callback: action('callback'),
};

export const PrimaryDisabled = Template.bind({});

PrimaryDisabled.args = {
  options: optionsPrimary,
  disabled: true,
  containerWidth: 300,
  value: optionsPrimary[2].value,
  callback: action('callback'),
};
