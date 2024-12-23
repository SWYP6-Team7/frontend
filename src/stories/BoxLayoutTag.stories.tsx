import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import InfoText from '@/components/designSystem/text/InfoText'
import BoxLayoutTag from '@/components/designSystem/tag/BoxLayoutTag'
import { palette } from '@/styles/palette'

const meta = {
  title: 'tag/BoxLayoutTag',
  component: BoxLayoutTag,

  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '내용(실제 사용환경에서는 ReactNode)',
      defaultValue: 'text'
    },

    addStyle: {
      control: {
        type: 'object',
        properties: {
          backgroundColor: {
            control: 'color',
            description: '배경색',
            defaultValue: palette.비강조4
          },
          color: {
            control: 'color',
            description: '글자색',
            defaultValue: palette.비강조
          },
          height: {
            control: 'text',
            description: '높이',
            defaultValue: '22px'
          },
          borderRadius: {
            control: 'text',
            description: '외곽 기울기',
            defaultValue: '20px'
          },
          border: {
            control: 'text',
            description: '외곽선',
            defaultValue: `1px solid transparent`
          },
          padding: {
            control: 'text',
            description: '패딩값',
            defaultValue: '4px 10px 4px 10px'
          },
          fontSize: {
            control: 'text',
            description: '폰트 사이즈',
            defaultValue: '12px'
          }
        }
      }
    }
  },
  args: {},
  decorators: [Story => <Story />]
} satisfies Meta<typeof BoxLayoutTag>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    text: 'tag',
    addStyle: {
      padding: '8px 14px',
      fontSize: '14px',
      height: '33px',
      borderRadius: '16px',
      border: `1px solid ${palette.keycolor}`,
      backgroundColor: palette.keycolorBG,
      color: palette.keycolor
    }
  }
}

export const Medium: Story = {
  args: {
    text: 'tag',
    addStyle: {
      padding: '10px 20px',
      fontSize: '16px',
      height: '42px',
      borderRadius: '30px',
      border: `1px solid ${palette.keycolor}`,
      backgroundColor: palette.keycolorBG,
      color: palette.keycolor
    }
  }
}

export const Large: Story = {
  args: {
    text: 'tag',
    addStyle: {
      padding: '14px 24px',
      fontSize: '16px',
      height: '48px',
      borderRadius: '30px',
      border: `1px solid ${palette.keycolor}`,
      backgroundColor: palette.keycolorBG,
      color: palette.keycolor
    }
  }
}
