import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', () => {
    const user = {
      name: '박건상',
      gender: 'male',
      likeTheme: ['healing', 'activity']
    }
    return HttpResponse.json(user, {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      }
    })
  }),
  http.post('/api/logout', () => {
    console.log('로그아웃')
    // resturn res(ctx.status(204));
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  })
]
