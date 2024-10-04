import Comment from '@/components/comment/Comment'
import CommentForm from '@/components/comment/CommentForm'
import styled from '@emotion/styled'
import React from 'react'

const TripComment = () => {
  return (
    <Container>
      <Comment />
      <CommentForm />
    </Container>
  )
}

const Container = styled.div`
  padding: 28px 24px;
`

export default TripComment
