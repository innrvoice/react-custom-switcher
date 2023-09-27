import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CustomSwitcher } from './CustomSwitcher';
import { CSSOverrides } from './CustomSwitcher.types';

export default {
  title: 'Customization/Variants',
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

// Emojis Example

const EmojiTemplate: StoryFn<typeof CustomSwitcher> = (args) => (
  <div
    style={{
      width: 270,
      height: 70,
      backgroundColor: '#eee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 35,
    }}>
    <CustomSwitcher {...args} />
  </div>
);

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

export const Emojis = EmojiTemplate.bind({});

Emojis.args = {
  options: optionsEmoji,
  variant: 'secondary',
  containerWidth: 250,
  value: 'hm',
  callback: action('callback'),
};

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
    label: '100K',
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

// Material UI Like Example

const optionsMui = [
  {
    value: 'off',
    color: '#7c00c8',
  },
  {
    value: 'on',
    color: '#b336ff',
  },
];

const muiCSSOverrides: CSSOverrides = {
  divisionLine: {
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#e5b9ff',
  },
  division: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

export const MaterialUILike = Template.bind({});

MaterialUILike.args = {
  options: optionsMui,
  variant: 'primary',
  containerWidth: 65,
  scaleWhileDrag: false,
  switchSize: 30,
  value: 'on',
  cssOverrides: muiCSSOverrides,
  callback: action('callback'),
};

// IOS Like Example

const optionsIos = [
  {
    value: 'off',
    color: '#aaa',
  },
  {
    value: 'on',
    color: '#666',
  },
];

const iosCSSOverrides: CSSOverrides = {
  divisionLine: {
    visibility: 'hidden',
  },
  division: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

const IosTemplate: StoryFn<typeof CustomSwitcher> = (args) => (
  <div
    style={{
      width: 80,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ddd',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <CustomSwitcher {...args} />
  </div>
);

export const IOSLike = IosTemplate.bind({});

IOSLike.args = {
  options: optionsIos,
  variant: 'primary',
  containerWidth: 70,
  scaleWhileDrag: false,
  switchSize: 30,
  value: 'on',
  cssOverrides: iosCSSOverrides,
  callback: action('callback'),
};

// Range Like Example

const optionsRange = new Array(40).fill(undefined).map((_, index) => ({
  value: `${index}`,
  color: '#b336ff',
  label: <span />,
}));

optionsRange[0].label = <span>MIN</span>;
optionsRange[9].label = <div style={{ backgroundColor: '#bbb', width: 1, height: 10 }} />;
optionsRange[19].label = <div style={{ backgroundColor: '#bbb', width: 3, height: 10 }} />;
optionsRange[29].label = <div style={{ backgroundColor: '#bbb', width: 5, height: 10 }} />;
optionsRange[39].label = <span>MAX</span>;

const rangeCSSOverrides: CSSOverrides = {
  division: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

export const RangeLike = Template.bind({});

RangeLike.args = {
  options: optionsRange,
  variant: 'primary',
  containerWidth: 400,
  scaleWhileDrag: 2,
  switchSize: 10,
  value: '0',
  cssOverrides: rangeCSSOverrides,
  callback: action('callback'),
};
