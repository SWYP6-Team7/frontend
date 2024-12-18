import TextButton from '@/components/designSystem/text/TextButton'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  title: 'text/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      defaultValue: '공지사항',
      control: 'text',
      description: 'text 부분'
    },
    isLeftVector: {
      control: 'boolean',
      description: '왼쪽 아이콘 영역',
      defaultValue: true
    },
    leftIconSrc: {
      control: 'text',
      description: '왼쪽 아이콘 src',
      defaultValue: '/images/createTripBtn.png'
    },
    isRightVector: {
      control: 'boolean',
      description: '오른쪽 영역',
      defaultValue: true
    },
    rightText: {
      control: 'text',
      description: 'text 영역(빈 문자열일시 없음)',
      defaultValue: '모잉'
    }
  },
  args: { onClick: fn() },
  decorators: [
    Story => {
      return (
        <div css={{ width: 342, height: 52, boxSizing: 'border-box' }}>
          <Story />
        </div>
      )
    }
  ]
} satisfies Meta<typeof TextButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isRightVector: false,
    rightText: '',
    isLeftVector: true,
    leftIconSrc: '/images/createTripBtn.png',
    text: '공지사항'
  }
}
