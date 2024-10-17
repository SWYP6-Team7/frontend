import { http, HttpResponse } from 'msw'
const trips = {
  content: [
    {
      travelNumber: 1,
      title: '프랑스 파리 여행',
      userNumber: 1,
      userName: '홍길동',
      tags: ['문화', '음식', '사진', '문화', '음식', '사진'],
      nowPerson: 2,
      maxPerson: 5,
      createdAt: '2024-10-04 21:51',
      registerDue: '2025년 01월 10일',
      bookmarked: true
    },
    {
      travelNumber: 2,
      title: '이탈리아 로마 여행',
      userNumber: 2,
      userName: '이몽룡',
      tags: ['역사', '건축', '맛집'],
      nowPerson: 3,
      maxPerson: 4,
      createdAt: '2024년 09월 02일',
      registerDue: '2025년 02월 15일',
      bookmarked: true
    },
    {
      travelNumber: 3,
      title: '스페인 바르셀로나 여행',
      userNumber: 3,
      userName: '성춘향',
      tags: ['해변', '휴식', '예술', '문화', '음식', '사진'],
      nowPerson: 1,
      maxPerson: 6,
      createdAt: '2024년 09월 03일',
      registerDue: '2025년 03월 20일',
      bookmarked: false
    },
    {
      travelNumber: 4,
      title: '영국 런던 여행',
      userNumber: 4,
      userName: '강감찬',
      tags: ['공연', '패션', '박물관'],
      nowPerson: 2,
      maxPerson: 5,
      createdAt: '2024년 09월 04일',
      registerDue: '2025년 04월 25일',
      bookmarked: true
    }
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 3,
    totalPages: 1
  }
}

const tripsRecommend = {
  content: [
    {
      travelNumber: 1,
      title: '추천순 여행',
      userNumber: 1,
      userName: '홍길동',
      tags: ['문화', '음식', '사진', '문화', '음식', '사진'],
      nowPerson: 2,
      maxPerson: 5,
      createdAt: '2024년 09월 01일',
      registerDue: '2025년 01월 10일',
      bookmarked: true
    },
    {
      travelNumber: 2,
      title: '이탈리아 로마 여행',
      userNumber: 2,
      userName: '이몽룡',
      tags: ['역사', '건축', '맛집'],
      nowPerson: 3,
      maxPerson: 4,
      createdAt: '2024년 09월 02일',
      registerDue: '2025년 02월 15일',
      bookmarked: true
    },
    {
      travelNumber: 3,
      title: '스페인 바르셀로나 여행',
      userNumber: 3,
      userName: '성춘향',
      tags: ['해변', '휴식', '예술', '문화', '음식', '사진'],
      nowPerson: 1,
      maxPerson: 6,
      createdAt: '2024년 09월 03일',
      registerDue: '2025년 03월 20일',
      bookmarked: true
    },
    {
      travelNumber: 4,
      title: '영국 런던 여행',
      userNumber: 4,
      userName: '강감찬',
      tags: ['공연', '패션', '박물관'],
      nowPerson: 2,
      maxPerson: 5,
      createdAt: '2024년 09월 04일',
      registerDue: '2025년 04월 25일',
      bookmarked: true
    },
    {
      travelNumber: 5,
      title: '미국 뉴욕 여행',
      userNumber: 5,
      userName: '안중근',
      tags: ['쇼핑', '음악', '미술'],
      nowPerson: 3,
      maxPerson: 7,
      createdAt: '2024년 09월 05일',
      registerDue: '2025년 05월 30일',
      bookmarked: true
    },
    {
      travelNumber: 6,
      title: '일본 도쿄 여행',
      userNumber: 6,
      userName: '을지문덕',
      tags: ['음식', '쇼핑', '자연'],
      nowPerson: 1,
      maxPerson: 3,
      createdAt: '2024년 09월 06일',
      registerDue: '2025년 06월 05일',
      bookmarked: true
    },
    {
      travelNumber: 7,
      title: '중국 베이징 여행',
      userNumber: 7,
      userName: '장보고',
      tags: ['역사', '문화', '음식'],
      nowPerson: 4,
      maxPerson: 8,
      createdAt: '2024년 09월 07일',
      registerDue: '2025년 07월 10일',
      bookmarked: true
    },
    {
      travelNumber: 8,
      title: '태국 방콕 여행',
      userNumber: 8,
      userName: '왕건',
      tags: ['해변', '휴양', '맛집'],
      nowPerson: 2,
      maxPerson: 6,
      createdAt: '2024년 09월 08일',
      registerDue: '2025년 08월 15일',
      bookmarked: true
    },
    {
      travelNumber: 9,
      title: '베트남 하노이 여행',
      userNumber: 9,
      userName: '고구려',
      tags: ['자연', '음식', '액티비티'],
      nowPerson: 1,
      maxPerson: 4,
      createdAt: '2024년 09월 09일',
      registerDue: '2025년 09월 20일',
      bookmarked: true
    },
    {
      travelNumber: 10,
      title: '호주 시드니 여행',
      userNumber: 10,
      userName: '백제',
      tags: ['동물', '자연', '레저'],
      nowPerson: 5,
      maxPerson: 5,
      createdAt: '2024년 09월 10일',
      registerDue: '2025년 10월 25일',
      bookmarked: true
    }
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 30,
    totalPages: 3
  }
}

const trips2 = {
  content: [
    {
      travelNumber: 11,
      title: '캐나다 밴쿠버 여행',
      userNumber: 11,
      userName: '조선',
      tags: ['자연', '액티비티', '산'],
      nowPerson: 3,
      maxPerson: 7,
      createdAt: '2024년 09월 11일',
      registerDue: '2025년 11월 10일',
      bookmarked: true
    },
    {
      travelNumber: 12,
      title: '독일 베를린 여행',
      userNumber: 12,
      userName: '신라',
      tags: ['역사', '음악', '건축'],
      nowPerson: 2,
      maxPerson: 5,
      createdAt: '2024년 09월 12일',
      registerDue: '2025년 12월 15일',
      bookmarked: true
    }
    // ... 8 more travel objects
  ],
  page: {
    size: 10,
    number: 1,
    totalElements: 30,
    totalPages: 3
  }
}

const trips3 = {
  content: [
    {
      travelNumber: 21,
      title: '브라질 리우 여행',
      userNumber: 21,
      userName: '대조영',
      tags: ['카니발', '음악', '해변'],
      nowPerson: 4,
      maxPerson: 8,
      createdAt: '2024년 09월 21일',
      registerDue: '2026년 01월 05일',
      bookmarked: true
    },
    {
      travelNumber: 22,
      title: '멕시코 칸쿤 여행',
      userNumber: 22,
      userName: '고려',
      tags: ['휴양', '리조트', '해양 스포츠'],
      nowPerson: 2,
      maxPerson: 6,
      createdAt: '2024년 09월 22일',
      registerDue: '2026년 02월 15일',
      bookmarked: true
    }
    // ... 8 more travel objects
  ],
  page: {
    size: 10,
    number: 2,
    totalElements: 30,
    totalPages: 3
  }
}
interface BookmarkPostReqBody {
  userNumber: number
  travelNumber: number
}
export const homeHandler = [
  http.get('/api/travels/recent', async ({ request }) => {
    const url = new URL(request.url)
    const pageParams = url.searchParams.get('page')
    return HttpResponse.json(trips)
    if (Number(pageParams) === 0) {
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(trips2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(trips3)
    } else {
      return HttpResponse.json({})
    }
  }),
  http.get('/api/bookmarks', async ({ request }) => {
    // return HttpResponse.json({})
    const url = new URL(request.url)
    const pageParams = url.searchParams.get('page')
    if (Number(pageParams) === 0) {
      return HttpResponse.json(trips)
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(trips2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(trips3)
    } else {
      return HttpResponse.json({})
    }
  }),
  http.post('/api/bookmarks', async ({ request }) => {
    const { userNumber, travelNumber } =
      (await request.json()) as BookmarkPostReqBody

    console.log(travelNumber, '번 여행 북마크 추가.')
    return HttpResponse.json({ status: 205 })
  }),
  http.delete('/api/bookmarks/:travelNumber', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json({ status: 200 })
  }),
  http.get('/api/my-travels', async ({ request }) => {
    const url = new URL(request.url)

    const pageParams = url.searchParams.get('page')
    if (Number(pageParams) === 0) {
      return HttpResponse.json(trips)
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(trips2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(trips3)
    } else {
      return HttpResponse.json({})
    }
  }),
  http.get('/api/my-applied-travels', async ({ request }) => {
    const url = new URL(request.url)

    const pageParams = url.searchParams.get('page')
    if (Number(pageParams) === 0) {
      return HttpResponse.json(trips)
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(trips2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(trips3)
    } else {
      return HttpResponse.json({})
    }
  }),
  http.get('/api/my-requested-travels', async ({ request }) => {
    const url = new URL(request.url)

    const pageParams = url.searchParams.get('page')
    if (Number(pageParams) === 0) {
      return HttpResponse.json(trips)
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(trips2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(trips3)
    } else {
      return HttpResponse.json({})
    }
  }),
  http.get('/api/travels/recommend', async ({ request }) => {
    const url = new URL(request.url)
    const pageParams = url.searchParams.get('page')
    if (Number(pageParams) === 0) {
      return HttpResponse.json(tripsRecommend)
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(trips2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(trips3)
    } else {
      return HttpResponse.json({})
    }
  }),
  http.post(`/api/toggleBookmark`, async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId') as string
    const postId = url.searchParams.get('postId')

    // const targetIdx = trips.findIndex(trip => trip.postId === postId)
    // const targetPost = trips[targetIdx]
    // const isAlreadyBookmarked = targetPost.userIdBookmarked.some(
    //   id => id === userId
    // )

    // if (isAlreadyBookmarked) {
    //   targetPost.userIdBookmarked = targetPost.userIdBookmarked.filter(
    //     id => id !== userId
    //   )
    // } else {
    //   targetPost.userIdBookmarked.push(userId)
    // }
    return HttpResponse.json(trips, { status: 200 })

    // const updatedUserIdBookmarked = [...userIdBookmarked, ]

    // trips.forEach((trip, idx) => {
    //   let exist = false
    //   const updated: string[] = []

    //   trip.userIdBookmarked.forEach(id => {
    //     if (id === userId && postId === trip.postId) {
    //       exist = true
    //     } else {
    //       updated.push(id)
    //     }
    //   })
    //   if (!exist) {
    //     trips[idx].userIdBookmarked.push(userId)
    //   } else {
    //     trips[idx].userIdBookmarked = [...updated]
    //   }
    // })
  }),
  http.get(`/api/bookmark`, async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    const userBookmarks = [
      {
        userId: '1',
        bookMarks: [
          {
            postId: 1,
            imgUrl: '/images/mountain.png',
            endDate: '2024-12-31',
            title: '제주도 한라산',
            description: '제주도 한라산 등반코스 가보자!'
          },
          {
            postId: 2,
            imgUrl: '/images/mountain.png',
            endDate: '2024-12-29',
            title: '제주도 한라산2',
            description: '제주도 한라산2 등반코스 가보자!'
          },
          {
            postId: 3,
            imgUrl: '/images/mountain.png',
            endDate: '2024-10-31',
            title: '제주도 한라산3',
            description: '제주도 한라산3 등반코스 가보자!'
          }
        ]
      },
      {
        userId: '2',
        bookMarks: [
          {
            postId: 5,
            imgUrl: '/images/mountain.png',
            endDate: '2024-12-31',
            title: '제주도 한라산',
            description: '제주도 한라산 등반코스 가보자!'
          },
          {
            postId: 6,
            imgUrl: '/images/mountain.png',
            endDate: '2024-12-29',
            title: '제주도 한라산2',
            description: '제주도 한라산2 등반코스 가보자!'
          },
          {
            postId: 7,
            imgUrl: '/images/mountain.png',
            endDate: '2024-10-31',
            title: '제주도 한라산3',
            description: '제주도 한라산3 등반코스 가보자!'
          }
        ]
      }
    ]
    const value = userBookmarks.find(v => v.userId === userId)

    // if (value === undefined)
    //   return HttpResponse.json(
    //     {
    //       userId: '1',
    //       bookMarks: []
    //     },
    //     { status: 200 }
    //   )
    console.log('bookmark msw')
    return HttpResponse.json(trips, { status: 200 })
  })
]
