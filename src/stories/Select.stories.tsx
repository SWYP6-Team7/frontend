import Select from '@/components/designSystem/Select'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
const meta = {
  title: 'Dropdown/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

// Wrapper 컴포넌트를 만들어 상태 관리
const SelectWrapper = ({
  list,
  noneValue
}: {
  list: string[]
  noneValue?: string
}) => {
  const [value, setValue] = useState<string>()

  return (
    <Select
      list={list}
      value={value}
      setValue={setValue}
      noneValue={noneValue}
    />
  )
}

export const Default: Story = {
  render: () => (
    <SelectWrapper
      list={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
      noneValue="Select an option"
    />
  )
}

export const LongList: Story = {
  render: () => (
    <SelectWrapper
      list={[
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10'
      ]}
      noneValue="Select from long list"
    />
  )
}
export const SingleOption: Story = {
  render: () => (
    <SelectWrapper
      list={['Only Option']}
      noneValue="Select single option"
    />
  )
}
