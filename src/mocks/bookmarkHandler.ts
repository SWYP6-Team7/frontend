import { http, HttpResponse } from 'msw'
const bookmarks = [
  {
    bookmarkId: 1,
    contentId: 1,
    contentType: 'TRAVEL',
    bookmarkDate: '2024-09-28T12:34:56',
    contentUrl: '/api/travel/detail/100'
  },
  {
    bookmarkId: 2,
    contentId: 2,
    contentType: 'COMMUNITY',
    bookmarkDate: '2024-09-28T13:45:21',
    contentUrl: '/api/community/detail/101'
  },
  {
    bookmarkId: 2,
    contentId: 3,
    contentType: 'COMMUNITY',
    bookmarkDate: '2024-09-28T13:45:21',
    contentUrl: '/api/community/detail/101'
  },
  {
    bookmarkId: 2,
    contentId: 4,
    contentType: 'COMMUNITY',
    bookmarkDate: '2024-09-28T13:45:21',
    contentUrl: '/api/community/detail/101'
  },
  {
    bookmarkId: 2,
    contentId: 102,
    contentType: 'COMMUNITY',
    bookmarkDate: '2024-09-28T13:45:21',
    contentUrl: '/api/community/detail/101'
  }
]

export const bookmarkHandler = [
  http.get('/api/bookmarks', async ({ request }) => {
    return HttpResponse.json(bookmarks, { status: 200 })
  }),
  http.get('/api/travel/:travelNumber/companions', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json(bookmarks, { status: 200 })
  }),
  http.delete('/api/travel/:travelNumber', async ({ request }) => {
    console.log(request, '요청.')
    const url = new URL(request.url)
    const travelNumber = url.searchParams.get('travelNumber')
    return HttpResponse.json({ status: 205 })
  })
]
