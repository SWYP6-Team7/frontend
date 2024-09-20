import styled from '@emotion/styled'
import React, { useState } from 'react'
import SelectArrow from './icons/SelectArrow'
import { palette } from '@/styles/palette'

const Accordion = ({
  id,
  title,
  children,
  initialChecked,
  count
}: {
  id: string
  count: number
  title: string
  children: React.ReactNode
  initialChecked: boolean
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked)
  return (
    <List>
      <input
        type="checkbox"
        id={id}
        css={{ display: 'none' }}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <Tab htmlFor={id}>
        <TitleContainer>
          <div>{title}</div>
          {count > 0 && <Count>{count}</Count>}
        </TitleContainer>
        <div css={{ transform: isChecked ? 'rotate(180deg)' : 'rotate(0)' }}>
          <SelectArrow
            width={12}
            height={6}
          />
        </div>
      </Tab>
      <Content checked={isChecked}>{children}</Content>
    </List>
  )
}

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Count = styled.div`
  width: 16px;
  height: 16px;
  padding: 1px 5px 1px 5px;
  gap: 10px;
  background-color: ${palette.keycolor};
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 600;
  line-height: 14.32px;
  color: ${palette.비강조4};

  opacity: 0px;
`

const Tab = styled.label`
  display: flex;

  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;

  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 2.3svh 0;
  cursor: pointer;
`

const Content = styled.div<{ checked: boolean }>`
  max-height: ${props => (props.checked ? '20svh' : '0')};

  padding: ${props => (props.checked ? '1.7svh' : '0 1.7svh')};

  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
`

const List = styled.li`
  overflow: hidden;
  list-style: none;
`

export default Accordion
