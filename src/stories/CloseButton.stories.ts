import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import CloseButton from '../components/designSystem/Buttons/CloseButton'

const meta = {
  title: 'Buttons/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#8D8D8D' }]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    setIsOpen: {
      description: '닫기 버튼을 누르면 모달이 꺼질 수 있도록 하는 setState'
    }
  },
  args: { setIsOpen: fn() }
} satisfies Meta<typeof CloseButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
