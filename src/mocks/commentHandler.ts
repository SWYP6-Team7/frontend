import { IComment, ICommentPost } from '@/model/comment'
import { http, HttpResponse } from 'msw'

const commentList = [
  {
    commentNumber: 1,
    userNumber: 101,
    content: '좋은 여행이었어요!',
    parentNumber: 0,
    regDate: '2024년 10월 04일 12시 30분',
    relatedType: 'travel',
    relatedNumber: 1001,
    writer: '김철수',
    repliesCount: 2,
    likes: 10,
    liked: true,
    travelWriterNumber: 201
  },
  {
    commentNumber: 2,
    userNumber: 102,
    content: '동의합니다, 정말 좋았습니다!',
    parentNumber: 1,
    regDate: '2024년 10월 04일 12시 35분',
    relatedType: 'travel',
    relatedNumber: 1001,
    writer: '박영희',
    repliesCount: 0,
    likes: 5,
    liked: false,
    travelWriterNumber: 201
  },
  {
    commentNumber: 3,
    userNumber: 103,
    content: '사진 정말 예쁘네요!',
    parentNumber: 0,
    regDate: '2024년 10월 04일 12시 40분',
    relatedType: 'photo',
    relatedNumber: 1002,
    writer: '이민호',
    repliesCount: 3,
    likes: 12,
    liked: true,
    travelWriterNumber: 202
  },
  {
    commentNumber: 4,
    userNumber: 104,
    content: '어디서 찍으신 건가요?',
    parentNumber: 3,
    regDate: '2024년 10월 04일 12시 45분',
    relatedType: 'photo',
    relatedNumber: 1002,
    writer: '정수현',
    repliesCount: 0,
    likes: 7,
    liked: false,
    travelWriterNumber: 202
  },
  {
    commentNumber: 5,
    userNumber: 105,
    content: '저도 가보고 싶어요!',
    parentNumber: 0,
    regDate: '2024년 10월 04일 12시 50분',
    relatedType: 'travel',
    relatedNumber: 1003,
    writer: '최은지',
    repliesCount: 1,
    likes: 8,
    liked: true,
    travelWriterNumber: 203
  },
  {
    commentNumber: 6,
    userNumber: 106,
    content: '여기 정말 추천해요!',
    parentNumber: 5,
    regDate: '2024년 10월 04일 12시 55분',
    relatedType: 'travel',
    relatedNumber: 1003,
    writer: '김지훈',
    repliesCount: 0,
    likes: 3,
    liked: false,
    travelWriterNumber: 203
  },
  {
    commentNumber: 7,
    userNumber: 107,
    content: '여행 정보 감사합니다.',
    parentNumber: 0,
    regDate: '2024년 10월 04일 13시 00분',
    relatedType: 'travel',
    relatedNumber: 1004,
    writer: '윤소영',
    repliesCount: 0,
    likes: 6,
    liked: true,
    travelWriterNumber: 204
  },
  {
    commentNumber: 8,
    userNumber: 108,
    content: '같이 가면 더 좋겠네요!',
    parentNumber: 7,
    regDate: '2024년 10월 04일 13시 05분',
    relatedType: 'travel',
    relatedNumber: 1004,
    writer: '송민수',
    repliesCount: 0,
    likes: 4,
    liked: false,
    travelWriterNumber: 204
  },
  {
    commentNumber: 9,
    userNumber: 109,
    content: '궁금한 점이 있는데 답변 부탁드려요.',
    parentNumber: 0,
    regDate: '2024년 10월 04일 13시 10분',
    relatedType: 'question',
    relatedNumber: 1005,
    writer: '황진우',
    repliesCount: 2,
    likes: 1,
    liked: false,
    travelWriterNumber: 205
  },
  {
    commentNumber: 10,
    userNumber: 110,
    content: '자세히 설명해 주셔서 감사합니다.',
    parentNumber: 9,
    regDate: '2024년 10월 04일 13시 15분',
    relatedType: 'question',
    relatedNumber: 1005,
    writer: '오지연',
    repliesCount: 0,
    likes: 9,
    liked: true,
    travelWriterNumber: 205
  }
]

export const commentHandlers = [
  // GET: 댓글 목록 조회
  http.get('/api/:relatedType/:relatedNumber/comments', ({ params }) => {
    console.log('GET 요청 - 댓글 목록 조회:', params)
    return new HttpResponse(JSON.stringify(commentList), { status: 200 })
  }),

  // POST: 새 댓글 작성
  http.post(
    '/api/:relatedType/:relatedNumber/comments',
    async ({ request, params }) => {
      const body = (await request.json()) as ICommentPost
      console.log('POST 요청 - 새 댓글 작성:', { params, body })
      return new HttpResponse(null, { status: 201 })
    }
  ),

  // PUT: 댓글 수정
  http.put('/api/comments/:commentNumber', async ({ request, params }) => {
    const body = (await request.json()) as Partial<IComment>
    console.log('PUT 요청 - 댓글 수정:', { params, body })
    return new HttpResponse(null, { status: 200 })
  }),

  // DELETE: 댓글 삭제
  http.delete('/api/comments/:commentNumber', ({ params }) => {
    console.log('DELETE 요청 - 댓글 삭제:', params)
    return new HttpResponse(null, { status: 204 })
  }),

  // POST: 좋아요 추가
  http.post('/api/comments/:commentNumber/like', ({ params }) => {
    console.log('POST 요청 - 좋아요 추가:', params)
    return new HttpResponse(null, { status: 200 })
  }),

  // DELETE: 좋아요 취소
  http.delete('/api/comments/:commentNumber/like', ({ params }) => {
    console.log('DELETE 요청 - 좋아요 취소:', params)
    return new HttpResponse(null, { status: 200 })
  })
]
