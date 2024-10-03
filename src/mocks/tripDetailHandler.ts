import { http, HttpResponse } from 'msw'
const tripDetail = {
  travelNumber: 25,
  userNumber: 3,
  ageGroup: '20대',
  userName: '김모잉',
  createdAt: '2024-09-21',
  location: '호주',
  title: '호주 아웃백 투어🦘',
  details:
    '이번 연말에 호주 여행 동행 구합니다\n아직 항공권은 예약을 안해서 같이 계획이랑 일정 조율해보면 좋을 것 같아요 \n사진 찍는 것도 좋아해요 ! 제가 20대 후반이라 20-30대 여성분이면 좋겠습니당',
  viewCount: 102,
  enrollCount: 2,
  bookmarkCount: 5,
  nowPerson: 5,
  maxPerson: 6,
  genderType: '여자만',
  dueDate: '2025-05-15',
  periodType: '일주일 이하',
  tags: ['✊ 즉흥', '🏔️ 자연', '🍔 먹방'],
  postStatus: '진행중',
  hostUserCheck: false,
  enrollmentNumber: null
}
const companions = {
  totalCount: 5,
  companions: [
    {
      userNumber: 2,
      userName: '김모잉',
      ageGroup: '20대'
    },
    {
      userNumber: 3,
      userName: '임모잉',
      ageGroup: '20대'
    },
    {
      userNumber: 4,
      userName: '박모잉',
      ageGroup: '30대'
    },
    {
      userNumber: 1,
      userName: '안모잉',
      ageGroup: '20대'
    },
    {
      userNumber: 5,
      userName: '정모잉',
      ageGroup: '30대'
    }
  ]
}
export const tripDetailHandler = [
  http.get('/api/travel/detail/:travelNumber', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json(tripDetail, { status: 200 })
  }),
  http.get('/api/travel/:travelNumber/companions', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json(companions, { status: 200 })
  }),
  http.delete('/api/travel/:travelNumber', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json({ status: 200 })
  })
]
