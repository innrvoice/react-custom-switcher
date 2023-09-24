import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CustomSwitcher } from './CustomSwitcher';
import { CSSOverrides } from './CustomSwitcher.types';

export default {
  title: 'Customization',
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

// Emojis Example

const optionsEmoji = [
  {
    label: <div style={{ marginTop: 3, fontSize: 26 }}>🤢</div>,
    value: 'bad',
    color: '#7700ca',
  },
  {
    label: <div style={{ marginTop: 3, fontSize: 26 }}>🤬</div>,
    value: 'rude',
    color: '#FF0000',
  },
  {
    label: <div style={{ marginTop: 3, fontSize: 26 }}>😕</div>,
    value: 'hm',
    color: '#0058d0',
  },
  {
    label: <div style={{ marginTop: 3, fontSize: 26 }}>🤩</div>,
    value: 'nice',
    color: '#d0c400',
  },
  {
    label: <div style={{ fontSize: 26 }}>🔥</div>,
    value: 'fire',
    color: '#ff8a00',
  },
];

export const Emojis = Template.bind({});

Emojis.args = {
  options: optionsEmoji,
  variant: 'secondary',
  containerWidth: 250,
  value: 'hm',
  callback: action('callback'),
};

Emojis.parameters = { layout: 'fullscreen' };

// Tip Example

const optionsTip = [
  {
    label: <div style={{ fontSize: 15, whiteSpace: 'nowrap' }}>No tip</div>,
    value: '0',
    color: 'gray',
  },
  {
    label: (
      <div style={{ fontSize: 15, marginLeft: 7 }}>
        5<span style={{ fontSize: 12 }}>%</span>
      </div>
    ),
    value: '5',
    color: '#005500',
  },
  {
    label: (
      <div style={{ fontSize: 15, marginLeft: 7 }}>
        10<span style={{ fontSize: 12 }}>%</span>
      </div>
    ),
    value: '10',
    color: '#006600',
  },
  {
    label: (
      <div style={{ fontSize: 15, marginLeft: 7 }}>
        15<span style={{ fontSize: 12 }}>%</span>
      </div>
    ),
    value: '15',
    color: '#007700',
  },
  {
    label: (
      <div style={{ fontSize: 15, marginLeft: 7 }}>
        30<span style={{ fontSize: 12 }}>%</span>
      </div>
    ),
    value: '30',
    color: '#008800',
  },
];

const tipCSSOverrides: CSSOverrides = {
  label: {
    top: '-70%',
  },

  switch: {
    width: 40,
    height: 25,
    borderRadius: 15,
  },

  divisionLine: {
    height: 3,
  },

  division: {
    width: 20,
    height: 13,
    borderRadius: 10,
  },

  cursorGrab: 'pointer',
  cursorGrabbing: 'pointer  ',
};

export const Tip = Template.bind({});

Tip.args = {
  options: optionsTip,
  containerWidth: 300,
  value: '0',
  cssOverrides: tipCSSOverrides,
  callback: action('callback'),
  scaleWhileDrag: false,
};

Tip.parameters = { layout: 'fullscreen' };

// Impressions Example

const optionsImpressions = [
  {
    label: '100',
    value: '100',
    color: '#003568',
  },
  {
    label: '1K',
    value: '1000',
    color: '#003970',
  },
  {
    label: '5K',
    value: '5000',
    color: '#004689',
  },

  {
    label: '10K',
    value: '10000',
    color: '#014f9d',
  },
  {
    label: '100k',
    value: '100000',
    color: '#005cb7',
  },
  {
    label: '1M',
    value: '1000000',
    color: '#0163c4',
  },
  {
    label: '♾️',
    value: 'infinity',
    color: '#FF5500',
  },
];

const impressionsCSSOverrides: CSSOverrides = {
  divisionLine: {
    height: 1,
    backgroundColor: '#ccc',
  },
  division: {
    border: '1px solid #ccc',
    width: 41,
    height: 41,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
};

export const Impressions = Template.bind({});

Impressions.args = {
  options: optionsImpressions,
  variant: 'secondary',
  containerWidth: 350,
  scaleWhileDrag: false,
  switchSize: 50,
  value: '100',
  cssOverrides: impressionsCSSOverrides,
  callback: action('callback'),
};

Impressions.parameters = { layout: 'fullscreen' };
