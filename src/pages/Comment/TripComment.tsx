import Comment from '@/components/comment/Comment'
import CommentForm from '@/components/comment/CommentForm'
import Spacing from '@/components/Spacing'
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
      {!isLoading && data && data.length > 0 ? (
        data.map(comment => (
          <Comment
            key={comment.commentNumber}
            comment={comment}
            relatedType="travel"
            relatedNumber={Number(travelNumber)}
          />
        ))
      ) : (
        <>
          <NoDataContainer>
            <img
              alt="댓글이 없습니다"
              width={80}
              height={80}
              src={'/images/noData.png'}
            />
            <Spacing size={16} />
            <NoDataTitle>
              아직 달린 댓글이 없어요
              <br />
              댓글을 달아보세요
            </NoDataTitle>
          </NoDataContainer>
        </>
      )}
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

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const NoDataTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: center;
`
export default TripComment
