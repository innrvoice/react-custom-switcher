import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CustomSwitcher } from './CustomSwitcher';

export default {
  title: 'Basic Variants/Secondary',
  component: CustomSwitcher,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#111111' },
      ],
    },
  },
} as Meta;

const Template: StoryFn<typeof CustomSwitcher> = (args) => <CustomSwitcher {...args} />;

// Secondary Variant

const optionsSecondary = [
  {
    label: '10',
    value: '10',
    color: '#ff8a00',
  },
  {
    label: '20',
    value: '20',
    color: '#ff8a00',
  },
  {
    label: '30',
    value: '30',
    color: '#ff8a00',
  },
  {
    label: '40',
    value: '40',
    color: '#ff8a00',
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
  callback: action('callback'),
};

Secondary.parameters = { layout: 'fullscreen' };

export const SecondaryDisabled = Template.bind({});

SecondaryDisabled.args = {
  options: optionsSecondary,
  containerWidth: 240,
  value: 'hm',
  disabled: true,
  variant: 'secondary',
  callback: action('callback'),
};

SecondaryDisabled.parameters = { layout: 'fullscreen' };
