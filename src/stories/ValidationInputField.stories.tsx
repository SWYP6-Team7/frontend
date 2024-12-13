import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import ValidationInputField from '@/components/designSystem/input/ValidationInputField'

const meta = {
  title: 'InputFields/ValidationInputField',
  component: ValidationInputField,

  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'text',
      description: 'input의 타입',
      defaultValue: 'text'
    },
    name: {
      control: 'text',
      description: 'input의 이름 속성',
      defaultValue: 'text'
    },
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
    showSuccess: {
      control: 'boolean',
      description: '성공 메세지 표시 여부',
      defaultValue: false
    },
    message: {
      control: 'text',
      description: '메세지',
      defaultValue: ''
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
} satisfies Meta<typeof ValidationInputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hasError: false,
    success: false,
    shake: false,
    showSuccess: false,
    value: '',
    placeholder: '플레이스 홀더',
    message: '',
    type: 'email',
    name: 'email',
    handleRemoveValue: () => {}
  }
}

export const Error: Story = {
  args: {
    hasError: true,
    success: false,
    shake: true,
    showSuccess: false,
    value: '땃쥐가 일하는 곳은?',
    placeholder: '플레이스 홀더',
    message: '맘스땃쥐',
    type: 'email',
    name: 'email',
    handleRemoveValue: () => {}
  }
}

export const Success: Story = {
  args: {
    hasError: false,
    success: true,
    shake: false,
    showSuccess: true,
    value: '땃쥐를 만졌을 때 하는 말은??',
    placeholder: '플레이스 홀더',
    message: '돈땃쥐미',
    type: 'email',
    name: 'email',
    handleRemoveValue: () => {}
  }
}
