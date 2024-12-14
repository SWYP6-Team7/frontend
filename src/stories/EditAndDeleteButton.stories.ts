import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import EditAndDeleteButton from '../components/designSystem/Buttons/EditAndDeleteButton'

const meta = {
  title: 'Buttons/EditAndDeleteButton',
  component: EditAndDeleteButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#8D8D8D' }]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        '버튼이 보이는지에 대한 상태값. 이에 따라 y축으로 인터렉션 변동 생김.',
      defaultValue: false
    },
    isMyApplyTrip: {
      control: 'boolean',
      description: '내 여행에서 케밥 누르면, 여행 취소 버튼으로 사용되는 여부'
    },
    deleteText: {
      control: 'text',
      description: '삭제하기 버튼에 사용될 텍스트'
    },
    editClickHandler: {
      description: '수정하기 버튼 클릭 후 처리할 함수'
    },
    deleteClickHandler: {
      description: '삭제하기 버튼 클릭 후 처리할 함수'
    }
  },

  args: { editClickHandler: fn(), deleteClickHandler: fn() }
} satisfies Meta<typeof EditAndDeleteButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: {
    isOpen: false,
    isMyApplyTrip: false
  }
}
