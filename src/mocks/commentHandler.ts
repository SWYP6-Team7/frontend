import { http, HttpResponse } from 'msw'

export const commentHandlers = [
  // 전체 댓글/답글 목록 조회 (GET)
  http.get(
    '/api/travel/:travelNumber/comments',
    async ({ request, params }) => {
      const { travelNumber } = params
      return HttpResponse.json({
        travelNumber,
        comments: [
          {
            commentNumber: 1,
            content: 'This is the first comment',
            author: 'User1',
            createdAt: '2024-09-28T10:00:00Z',
            replies: [
              {
                replyNumber: 1,
                content: 'This is a reply to the first comment',
                author: 'User2',
                createdAt: '2024-09-28T10:05:00Z'
              }
            ]
          },
          {
            commentNumber: 2,
            content: 'This is the second comment',
            author: 'User3',
            createdAt: '2024-09-29T11:00:00Z',
            replies: []
          }
        ]
      })
    }
  ),

  // 댓글 작성 (POST)
  http.post(
    '/api/travel/:travelNumber/comments',
    async ({ request, params }) => {
      const { travelNumber } = params
      const { comment } = (await request.json()) as { comment: string }
      return HttpResponse.json({
        message: 'Comment added successfully',
        travelNumber,
        comment: {
          commentNumber: 3, // Example of the new comment ID
          content: comment,
          author: 'User4',
          createdAt: new Date().toISOString()
        }
      })
    }
  ),

  // 답글 작성 (POST)
  http.post(
    '/api/travel/:travelNumber/comments/:parentCommentNumber/replies',
    async ({ request, params }) => {
      const { travelNumber, parentCommentNumber } = params
      const { reply } = (await request.json()) as { reply: string }
      return HttpResponse.json({
        message: 'Reply added successfully',
        travelNumber,
        parentCommentNumber,
        reply: {
          replyNumber: 2, // Example of the new reply ID
          content: reply,
          author: 'User5',
          createdAt: new Date().toISOString()
        }
      })
    }
  ),

  // 댓글/답글 수정 (PUT)
  http.put(
    '/api/travel/:travelNumber/comments/:commentNumber',
    async ({ request, params }) => {
      const { travelNumber, commentNumber } = params
      const { updatedComment } = (await request.json()) as {
        updatedComment: string
      }
      return HttpResponse.json({
        message: 'Comment updated successfully',
        travelNumber,
        commentNumber,
        updatedComment: {
          content: updatedComment,
          updatedAt: new Date().toISOString()
        }
      })
    }
  ),

  // 댓글/답글 삭제 (DELETE)
  http.delete(
    '/api/travel/:travelNumber/comments/:commentNumber',
    async ({ request, params }) => {
      const { travelNumber, commentNumber } = params
      return HttpResponse.json({
        message: `Comment ${commentNumber} deleted successfully`,
        travelNumber
      })
    }
  ),

  // 좋아요 증가 (POST)
  http.post(
    '/api/travel/:travelNumber/comments/:commentNumber/like',
    async ({ request, params }) => {
      const { travelNumber, commentNumber } = params
      return HttpResponse.json({
        message: `Like added to comment ${commentNumber} successfully`,
        travelNumber,
        commentNumber
      })
    }
  ),

  // 좋아요 감소 (DELETE)
  http.delete(
    '/api/travel/:travelNumber/comments/:commentNumber/like',
    async ({ request, params }) => {
      const { travelNumber, commentNumber } = params
      return HttpResponse.json({
        message: `Like removed from comment ${commentNumber} successfully`,
        travelNumber,
        commentNumber
      })
    }
  )
]
