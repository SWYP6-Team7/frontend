import { http, HttpResponse } from 'msw'
let list = {
  totalCount: 2,
  enrollments: [
    {
      enrollmentNumber: 2,
      userName: '김모잉',
      userAgeGroup: '20대',
      enrolledAt: '2024.09.30 06:44',
      message: '저도 여행에 참가하고 싶습니다!!! 즉흥, 여유, 자연 태그',
      status: '대기'
    },
    {
      enrollmentNumber: 3,
      userName: '김호주',
      userAgeGroup: '20대',
      enrolledAt: '2024.09.28 18:44',
      message: `저는 시드니에서 유학중인 김호주라고 합니다!! \n 방학기간동안 아웃백 여행을 가고싶어 찾아보던 중에 신청하게 되었어요🙂 어쩌구 최대 1000자 글자에 맞게 박스 늘려서 다 보여주기`,
      status: '대기'
    }
  ]
}
const data = 'ok'
export const enrollmentListHandler = [
  http.get('/api/travel/:travelNumber/enrollments', async ({ request }) => {
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json(list, { status: 200 })
  }),
  http.put(
    '/api/enrollment/:enrollmentNumber/rejection',
    async ({ request }) => {
      const url = new URL(request.url)
      const enrollmentNumber = parseInt(
        url.searchParams.get('enrollmentNumber')!
      )
      list = {
        totalCount: 1,
        enrollments: [
          {
            enrollmentNumber: 3,
            userName: '김호주',
            userAgeGroup: '20대',
            enrolledAt: '2024.09.28 18:44',
            message: `저는 시드니에서 유학중인 김호주라고 합니다!! \n 방학기간동안 아웃백 여행을 가고싶어 찾아보던 중에 신청하게 되었어요🙂 어쩌구 최대 1000자 글자에 맞게 박스 늘려서 다 보여주기`,
            status: '대기'
          }
        ]
      }
      return HttpResponse.json({ list, data, status: 200 })
    }
  ),
  http.post(
    '/api/enrollment/:enrollmentNumber/acceptance',
    async ({ request }) => {
      const url = new URL(request.url)
      const enrollmentNumber = url.searchParams.get('enrollmentNumber')
      list = {
        totalCount: 1,
        enrollments: [
          {
            enrollmentNumber: 3,
            userName: '김호주',
            userAgeGroup: '20대',
            enrolledAt: '2024.09.28 18:44',
            message: `저는 시드니에서 유학중인 김호주라고 합니다!! \n 방학기간동안 아웃백 여행을 가고싶어 찾아보던 중에 신청하게 되었어요🙂 어쩌구 최대 1000자 글자에 맞게 박스 늘려서 다 보여주기`,
            status: '대기'
          }
        ]
      }
      return HttpResponse.json(data, { status: 200 })
    }
  )
]
