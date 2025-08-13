import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials', 
    '@storybook/addon-a11y', 
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds'
  ],
  framework: { 
    name: '@storybook/nextjs', 
    options: {
      builder: {
        useSWC: true,
      },
    }
  },
  docs: { 
    autodocs: true,
    defaultName: 'Documentation'
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    STORYBOOK_ENV: 'development',
  }),
};

export default config;
