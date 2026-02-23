import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    docs: {
      codePanel: false,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        light: { name: 'light', value: '#F5F5F5' },
        dark: { name: 'dark', value: '#111111' },
      },
    },

    layout: 'centered',
  },

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
};

export default preview;
