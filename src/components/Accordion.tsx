import styled from '@emotion/styled'
import React, { useState } from 'react'

const Accordion = ({
  id,
  title,
  children,
  initialChecked
}: {
  id: string
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
      <Tab htmlFor={id}>{title}</Tab>
      <Content checked={isChecked}>{children}</Content>
    </List>
  )
}

const Tab = styled.label`
  display: block;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 20px 0;
  cursor: pointer;
`

const Content = styled.div<{ checked: boolean }>`
  max-height: ${props => (props.checked ? '100dvh' : '0')};
  padding: ${props => (props.checked ? '15px' : '0 15px')};
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
`

const List = styled.li`
  overflow: hidden;
  list-style: none;
`

export default Accordion
