import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    try {
      console.log('requeset', request)
      const formData = await request.json()
      console.log('formData', formData)

      return HttpResponse.json(
        { userId: 1, accessToken: 'dalkejoiauetaenaltkenl1j2an' },
        {
          headers: {
            'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/'
          }
        }
      )
    } catch (error) {
      console.error('Error handling request:', error)
      return HttpResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }),
  http.post('/api/users/new', async ({ request }) => {
    const formData: any = await request.json()
    console.log('email register', formData)
    return HttpResponse.json(
      { userId: 1, accessToken: 'dalkejoiauetaenaltkenl1j2an' },
      {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/'
        }
      }
    )
  }),
  http.post('/api/logout', () => {
    console.log('로그아웃')
    // resturn res(ctx.status(204));
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.get(`/api/user/:userId`, async () => {
    return HttpResponse.json(
      {
        userId: 1,
        name: '신짱구',
        age: 5,
        gender: 'male',
        phone: '010-1234-5678',
        birthYear: '1994년 5월 5일',
        introduce: '김철수',
        tags: [{ tagName: '천방지축' }, { tagName: '어리둥절' }]
      },
      {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/'
        }
      }
    )
  })
]
