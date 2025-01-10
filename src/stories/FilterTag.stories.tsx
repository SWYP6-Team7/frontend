import type { Meta, StoryObj } from '@storybook/react'
import { palette } from '@/styles/palette'
import SearchFilterTag from '@/components/designSystem/tag/SearchFilterTag'

const meta = {
  title: 'tag/FilterTag',
  component: SearchFilterTag,

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
    active: {
      control: 'boolean',
      description: '활성화 상태',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      defaultValue: false
    },

    addStyle: {
      control: {
        type: 'object',
        properties: {
          backgroundColor: {
            control: 'color',

            description: '배경색',
            defaultValue: palette.검색창
          },
          color: {
            control: 'color',
            description: '글자색',
            defaultValue: palette.기본
          },

          borderRadius: {
            control: 'text',
            description: '외곽 기울기',
            defaultValue: '15px'
          },
          border: {
            control: 'text',
            description: '외곽선',
            defaultValue: `1px solid ${palette.비강조3}`
          },
          padding: {
            control: 'text',
            description: '패딩값',
            defaultValue: '8px 16px'
          },
          fontWeight: {
            control: 'text',
            description: 'font weight',
            defaultValue: '600'
          },
          fontSize: {
            control: 'text',
            description: '폰트 사이즈',
            defaultValue: '14px'
          }
        }
      }
    }
  },
  args: {},
  decorators: [Story => <Story />]
} satisfies Meta<typeof SearchFilterTag>

export default meta
type Story = StoryObj<typeof meta>

export const NoneActive: Story = {
  args: {
    text: 'filter',
    active: false,
    idx: 0,
    disabled: false,
    addStyle: {
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      borderRadius: '15px',
      border: `1px solid ${palette.비강조3}`,
      backgroundColor: '#fff',
      color: palette.기본
    }
  }
}

export const Active: Story = {
  args: {
    text: 'filter',
    active: true,
    idx: 0,
    disabled: false,
    addStyle: {
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      borderRadius: '15px',
      border: `1px solid ${palette.비강조3}`,
      backgroundColor: palette.keycolor,
      color: '#fff'
    }
  }
}
