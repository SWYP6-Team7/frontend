import styled from '@emotion/styled'
import Comment from '../comment/Comment'
import CommentForm from '../comment/CommentForm'
import { useParams } from 'react-router-dom'
import useComment from '@/hooks/comment/useComment'
import { palette } from '@/styles/palette'

const CommunityComment = () => {
  const { communityNumber } = useParams()

  if (!communityNumber) {
    return null
  }
  const {
    commentList: { isLoading, data, error }
  } = useComment('community', Number(communityNumber))
  return (
    <Container>
      <Title>댓글 3</Title>
      {!isLoading &&
        data &&
        data.length > 0 &&
        data.map(comment => (
          <Comment
            key={comment.commentNumber}
            comment={comment}
            relatedType="community"
            relatedNumber={Number(communityNumber)}
          />
        ))}
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
