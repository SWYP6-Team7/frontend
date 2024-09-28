import { http, HttpResponse } from 'msw'
const tripDetail = {
  travelNumber: 25,
  userNumber: 3,
  userName: '김모잉',
  createdAt: '2024-09-21',
  location: '호주',
  title: '호주 아웃백 투어🦘',
  details:
    '이번 연말에 호주 여행 동행 구합니다\n아직 항공권은 예약을 안해서 같이 계획이랑 일정 조율해보면 좋을 것 같아요 \n사진 찍는 것도 좋아해요 ! 제가 20대 후반이라 20-30대 여성분이면 좋겠습니당',
  maxPerson: 5,
  genderType: '여자만',
  dueDate: '2025-05-15',
  periodType: '일주일 이하',
  tags: ['즉흥', '자연', '동성선호'],
  postStatus: '모집 중',
  applyPerson: 2,
  interestPerson: 5,
  views: 102,
  isOwner: false,
  canApply: true
}

export const tripDetailHandler = [
  http.get('/api/travel/detail/:travelNumber', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json(tripDetail, { status: 200 })
  })
]
