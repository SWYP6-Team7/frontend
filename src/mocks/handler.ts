import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    try {
      console.log('requeset', request)
      const formData = await request.json()
      console.log('formData', formData)

      return HttpResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )

      return HttpResponse.json(formData, {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/'
        }
      })
    } catch (error) {
      console.error('Error handling request:', error)
      return HttpResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
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
