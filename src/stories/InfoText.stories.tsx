import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import InfoText from '@/components/designSystem/text/InfoText'

const meta = {
  title: 'text/InfoText',
  component: InfoText,

  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    hasError: {
      control: 'boolean',
      description: '에러 상태인지',
      defaultValue: false
    },
    success: {
      control: 'boolean',
      description:
        '성공 상태인지(에러 상태와 같이 true로 들어오면 에러 상태가 우선순위',
      defaultValue: false
    },
    children: {
      control: 'text',
      description: '텍스트 내용',
      defaultValue: '인포 텍스트'
    },
    shake: {
      control: 'boolean',
      description: 'shake 애니메이션',
      defaultValue: false
    }
  },
  args: {},
  decorators: [Story => <Story />]
} satisfies Meta<typeof InfoText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '인포 텍스트',
    success: false,
    hasError: false,
    shake: false
  }
}

export const Error: Story = {
  args: {
    children: '에러 텍스트',
    success: false,
    hasError: true,
    shake: true
  }
}

export const Success: Story = {
  args: {
    children: '성공 텍스트',
    success: true,
    hasError: false,
    shake: false
  }
}
