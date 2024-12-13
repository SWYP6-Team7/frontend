import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import StateInputField from '@/components/designSystem/input/StateInputField'

const meta = {
  title: 'InputFields/StateInputField',
  component: StateInputField,

  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    hasError: {
      control: 'boolean',
      description: '해당 input이 오류 상태인지',
      defaultValue: false
    },
    placeholder: {
      control: 'text',
      description: '인풋 필드의 placeholder',
      defaultValue: '텍스트를 입력해주세요'
    },
    value: {
      control: 'text',
      description: '인풋 필드의 값',
      defaultValue: ''
    },
    success: {
      control: 'boolean',
      description: '인풋 필드의 성공상태',
      defaultValue: false
    },
    shake: {
      control: 'boolean',
      description: '인풋 필드 쉐이크 애니메이션',
      defaultValue: false
    },
    height: {
      control: 'number',
      description: '인풋 필드의 높이(기본값 48)',
      defaultValue: 48
    },
    showIcon: {
      control: 'boolean',
      description: '인풋 필드 상태 아이콘 표시 여부',
      defaultValue: true
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
} satisfies Meta<typeof StateInputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hasError: false,
    success: false,
    shake: false,
    showSuccessIcon: false,
    value: '',
    placeholder: '플레이스 홀더',
    showIcon: true,
    height: 48,
    handleRemoveValue: () => {}
  }
}
