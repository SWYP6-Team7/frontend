'use client'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React from 'react'

export default function Announcement() {
  return (
    <Container>
      <Text>
        아직 등록된
        <br /> 공지가 없어요
      </Text>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100svh - 200px);
`
const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  text-align: center;
  color: ${palette.비강조};
`
