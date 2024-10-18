import styled from '@emotion/styled'
import Comment from '../comment/Comment'
import CommentForm from '../comment/CommentForm'
import { useParams } from 'react-router-dom'
import useComment from '@/hooks/comment/useComment'
import { palette } from '@/styles/palette'
import React from 'react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useInView } from 'react-intersection-observer'

const CommunityComment = () => {
  const { communityNumber } = useParams()
  const [ref, inView] = useInView()
  if (!communityNumber) {
    return null
  }
  const {
    commentList: { isLoading, data, isFetching, hasNextPage, fetchNextPage }
  } = useComment('community', Number(communityNumber))

  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage])
  return (
    <Container>
      <Title>댓글 {data?.pages[0]?.page?.totalElements ?? 0}</Title>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((comment, itemIndex) => (
              <Comment
                key={comment.commentNumber}
                comment={comment}
                relatedType="community"
                relatedNumber={Number(communityNumber)}
              />
            ))}
          </React.Fragment>
        ))}

      <div
        ref={ref}
        css={{ height: 130 }}
      />
      <CommentForm
        relatedType="community"
        relatedNumber={Number(communityNumber)}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 28px 0;

  overflow-y: auto;
`
const Title = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  color: ${palette.비강조};
  font-weight: 600;
  line-height: 19.09px;
`

export default CommunityComment
