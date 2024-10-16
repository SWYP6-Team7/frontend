import { request } from 'http'
import { http, HttpResponse } from 'msw'
const data = {
  email: 'moing.naver.com',
  name: '모잉',
  gender: '여자',
  ageGroup: '20대',
  proIntroduce: '',
  preferredTags: ['단기', '즉흥', '계획', '중장기', '액티비티']
}
interface PasswordBody {
  confirmPassword: string
}
const URL = {
  url: 'https://moing-hosted-contents.s3.ap-northeast-2.amazonaws.com/images/profile/default/defaultProfile.png'
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
  }),
  http.delete('/api/user/delete', async ({ request }) => {
    return HttpResponse.json({ status: 204 })
  }),
  http.get('/api/profile/:userId/image', async ({ request }) => {
    return HttpResponse.json({
      url: 'https://moing-hosted-contents.s3.ap-northeast-2.amazonaws.com/images/profile/default/defaultProfile.png',
      status: 204
    })
  })
]
