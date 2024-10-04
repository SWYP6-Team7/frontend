import Comment from '@/components/comment/Comment'
import CommentForm from '@/components/comment/CommentForm'
import useComment from '@/hooks/comment/useComment'

import styled from '@emotion/styled'
import React from 'react'
import { useParams } from 'react-router-dom'

const TripComment = () => {
  const { travelNumber } = useParams()

  if (!travelNumber) {
    return null
  }
  const {
    commentList: { isLoading, data, error }
  } = useComment('travel', Number(travelNumber))
  console.log('data', data)
  return (
    <Container>
      {!isLoading &&
        data &&
        data.length > 0 &&
        data.map(comment => (
          <Comment
            key={comment.commentNumber}
            comment={comment}
            relatedType="travel"
            relatedNumber={Number(travelNumber)}
          />
        ))}
      <CommentForm
        relatedType="travel"
        relatedNumber={Number(travelNumber)}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 28px 24px;
  height: calc(
    100svh -
      (
        calc((16 * 100) / 844) * 1svh + 48px + calc((40 * 100) / 844) * 1svh +
          68px + 24px
      )
  );
  overflow-y: auto;
`

export default TripComment
