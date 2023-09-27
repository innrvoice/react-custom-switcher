import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'default',
      values: [
        {
          name: 'light',
          value: '#F5F5F5',
        },
        {
          name: 'dark',
          value: '#111111',
        },
      ],
    },
  },
};

export default preview;
