import { http, HttpResponse } from 'msw'
const trips = [
  {
    postId: '1',
    imgUrl: '/images/japan.png',
    endDate: '2024-10-13',
    title: '🚃 일본 기차여행',
    description: '기차타고 일본 시골 감성 느껴보러 떠나요!',
    createdDate: '2024-09-15',
    tags: ['일본', '시골', '여유'],
    total: 5,
    recruits: 2,
    userIdBookmarked: ['1', '2', '3']
  },
  {
    postId: '2',
    imgUrl: '/images/japan.png',
    endDate: '2024-10-13',
    title: '🚃 일본 기차여행',
    description: '기차타고 일본 시골 감성 느껴보러 떠나요!',
    createdDate: '2024-09-15',
    tags: ['일본', '시골', '여유'],
    total: 5,
    recruits: 2,
    userIdBookmarked: ['4', '3', '2']
  },
  {
    postId: '3',
    imgUrl: '/images/japan.png',
    endDate: '2024-10-13',
    title: '🚃 일본 기차여행',
    description: '기차타고 일본 시골 감성 느껴보러 떠나요!',
    createdDate: '2024-09-15',
    tags: ['일본', '시골', '여유'],
    total: 5,
    recruits: 2,
    userIdBookmarked: ['1', '12', '13']
  }
]
export const homeHandler = [
  http.get('/api/travels/recent', async ({ request }) => {
    return HttpResponse.json(trips, { status: 200 })
  }),
  http.get('/api/travels/recommend', async ({ request }) => {
    return HttpResponse.json(trips, { status: 200 })
  }),
  http.get(`/api/profile/me`, async ({ request }) => {
    const url = new URL(request.url)
    const accessToken = url.searchParams.get('accessToken') as string
    return HttpResponse.json('모잉', { status: 200 })
  }),
  http.post(`/api/toggleBookmark`, async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId') as string
    const postId = url.searchParams.get('postId')

    const targetIdx = trips.findIndex(trip => trip.postId === postId)
    const targetPost = trips[targetIdx]
    const isAlreadyBookmarked = targetPost.userIdBookmarked.some(
      id => id === userId
    )

    if (isAlreadyBookmarked) {
      targetPost.userIdBookmarked = targetPost.userIdBookmarked.filter(
        id => id !== userId
      )
    } else {
      targetPost.userIdBookmarked.push(userId)
    }
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

    if (value === undefined)
      return HttpResponse.json(
        {
          userId: '1',
          bookMarks: []
        },
        { status: 200 }
      )
    return HttpResponse.json(value, { status: 200 })
  })
]
