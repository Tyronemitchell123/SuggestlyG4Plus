import type { Meta, StoryObj } from '@storybook/react';
import { ConsentManager } from './ConsentManager';

const meta: Meta<typeof ConsentManager> = {
  title: 'Compliance/ConsentManager',
  component: ConsentManager,
  parameters: { 
    controls: { exclude: ['initial','nonce'] },
    docs: {
      description: {
        component: 'Privacy consent manager for GDPR compliance with analytics and marketing preferences.'
      }
    }
  },
  argTypes: {
    initial: {
      description: 'Initial consent state as JSON string',
      control: { type: 'text' }
    }
  }
};
export default meta;

type Story = StoryObj<typeof ConsentManager>;

export const NoConsentBanner: Story = { 
  args: { initial: undefined },
  parameters: {
    docs: {
      description: {
        story: 'Shows the consent banner when no initial consent is provided.'
      }
    }
  }
};

export const AnalyticsOnly: Story = { 
  args: { initial: JSON.stringify({ analytics: true, marketing: false }) },
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured with analytics consent only.'
      }
    }
  }
};

export const AllowAll: Story = { 
  args: { initial: JSON.stringify({ analytics: true, marketing: true }) },
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured with all consent granted.'
      }
    }
  }
};

export const MarketingOnly: Story = { 
  args: { initial: JSON.stringify({ analytics: false, marketing: true }) },
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured with marketing consent only.'
      }
    }
  }
};
