import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import InputField from "@/components/designSystem/input/InputField";

const meta = {
  title: "InputFields/InputField",
  component: InputField,

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isRemove: {
      control: "boolean",
      description: "내용 삭제 버튼 표시 여부",
      defaultValue: true,
    },
    isHome: {
      control: "boolean",
      description: "홈 화면 input인지 여부",
      defaultValue: false,
    },
    icon: {
      control: "boolean",
      description: "아이콘 표시 여부. 외부에서 아이콘을 전달해서 input field 내부 왼쪽에 표현 가능",
      defaultValue: false,
    },
    placeholder: {
      control: "text",
      description: "인풋 필드의 placeholder",
      defaultValue: "텍스트를 입력해주세요",
    },
    value: {
      control: "text",
      description: "인풋 필드의 값",
      defaultValue: "",
    },

    onChange: { action: "changed", description: "텍스트 필드 값 변경 이벤트" },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 342 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "플레이스 홀더",
  },
};
