import type { Meta, StoryObj } from '@storybook/react';
import ValueCard from './ValueCard';
import { Crown, Shield, Zap, Users, Target, Globe } from 'lucide-react';

const meta: Meta<typeof ValueCard> = {
  title: 'Content/ValueCard',
  component: ValueCard,
  args: { 
    icon: Crown, 
    title: 'Elite Advisory', 
    desc: 'Personalized strategies for UHNWIs.' 
  },
  parameters: {
    docs: {
      description: {
        component: 'Value proposition card with luxury styling and hover effects.'
      }
    }
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['Crown', 'Shield', 'Zap', 'Users', 'Target', 'Globe'],
      mapping: {
        Crown,
        Shield,
        Zap,
        Users,
        Target,
        Globe
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof ValueCard>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default value card with crown icon and elite advisory content.'
      }
    }
  }
};

export const LongCopy: Story = {
  args: { 
    desc: 'Personalized strategies for UHNWIs with multi-jurisdictional complexity, rapid response, and white-glove delivery.' 
  },
  parameters: {
    docs: {
      description: {
        story: 'Value card with longer description text to test text wrapping.'
      }
    }
  }
};

export const Security: Story = {
  args: {
    icon: Shield,
    title: 'Secure Infrastructure',
    desc: 'Bank-grade security with end-to-end encryption.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Value card highlighting security features.'
      }
    }
  }
};

export const Speed: Story = {
  args: {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Real-time processing and instant results.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Value card emphasizing speed and performance.'
      }
    }
  }
};

export const Global: Story = {
  args: {
    icon: Globe,
    title: 'Global Reach',
    desc: 'Worldwide coverage with local expertise.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Value card showcasing global capabilities.'
      }
    }
  }
};
