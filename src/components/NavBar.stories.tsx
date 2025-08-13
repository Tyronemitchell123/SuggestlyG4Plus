import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main navigation bar with luxury styling and mobile responsiveness.'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default navigation bar with all features enabled.'
      }
    }
  }
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Navigation bar on mobile devices with hamburger menu.'
      }
    }
  }
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Navigation bar on tablet devices.'
      }
    }
  }
};
