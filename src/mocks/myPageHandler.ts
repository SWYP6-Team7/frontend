import { request } from 'http'
import { http, HttpResponse } from 'msw'
const data = {
  email: 'moing.naver.com',
  name: '모잉',
  gender: '여자',
  ageGroup: '20대',
  proIntroduce: '',
  preferredTags: ['액티비티', '계획']
}
interface PasswordBody {
  confirmPassword: string
}

export const myPageHandler = [
  http.get('/api/profile/me', async ({ request }) => {
    return HttpResponse.json(data, { status: 200 })
  }),
  http.put('/api/profile/update', async ({ request }) => {
    return HttpResponse.json({ status: 200 })
  }),
  http.post('api/password/verify', async ({ request }) => {
    return HttpResponse.json({ status: 200 })
  }),
  http.post('api/image/:relatedType/:relatedNumber', async ({ request }) => {
    const data = {
      url: 'url'
    }
    return HttpResponse.json(data, { status: 200 })
  }),
  http.put('/api/profile/password/change', async ({ request }) => {
    return HttpResponse.json({ status: 200 })
  })
]
