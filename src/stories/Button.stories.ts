import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from '../components/designSystem/Buttons/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    text: {
      control: 'text',
      description: '버튼 텍스트',
      defaultValue: '텍스트'
    },
    type: {
      control: 'text',
      description: '버튼의 타입: 제출용, 초기화용, 일반 버튼용',
      defaultValue: 'submit'
    },
    addStyle: {
      control: {
        type: 'object',
        properties: {
          backgroundColor: {
            control: 'color',
            description: '배경색',
            defaultValue: 'rgba(62, 141, 0, 1)'
          },
          color: {
            control: 'color',
            description: '글자색',
            defaultValue: 'white'
          },
          weight: {
            control: 'text',
            description: '글자 굵기',
            defaultValue: 'semiBold'
          },
          boxShadow: {
            control: 'text',
            description: '그림자',
            defaultValue: '-2px 4px 5px 0px rgba(170, 170, 170, 0.14)'
          }
        }
      }
    },
    disabled: { control: 'boolean' },
    children: {
      control: 'text',
      description: '버튼 내용'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    text: '다음',
    type: 'submit',
    addStyle: {
      backgroundColor: 'rgba(62, 141, 0, 1)',
      color: 'white',
      boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.14)',
      weight: 'semiBold'
    },
    disabled: false,
    children: ''
  }
}
