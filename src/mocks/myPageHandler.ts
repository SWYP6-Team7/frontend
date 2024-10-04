import { http, HttpResponse } from 'msw'
const data = {
  email: 'moing.naver.com',
  name: '모잉',
  gender: '여자',
  ageGroup: '20대',
  proIntroduce: '',
  preferredTags: ['액티비티', '계획']
}

export const myPageHandler = [
  http.get('/api/profile/me', async ({ request }) => {
    return HttpResponse.json(data, { status: 200 })
  }),
  http.put('/api/profile/update', async ({ request }) => {
    return HttpResponse.json({ status: 200 })
  })
]
