import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import CommentInput from '@/components/designSystem/input/CommentInput'

const meta = {
  title: 'InputFields/CommentInput',
  component: CommentInput,

  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '댓글 필드의 placeholder',
      defaultValue: '텍스트를 입력해주세요'
    },
    value: {
      control: 'text',
      description: '댓글 필드의 값',
      defaultValue: ''
    },
    setReset: {
      description: '대댓글 작업 시 포커스가 끊기면 초기화해주기 위한 부분'
    },

    onChange: { action: 'changed', description: '텍스트 필드 값 변경 이벤트' }
  },
  args: {
    onChange: fn()
  },
  decorators: [
    Story => (
      <div style={{ width: 342 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CommentInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '',
    placeholder: '플레이스 홀더',
    setReset: () => {}
  }
}
