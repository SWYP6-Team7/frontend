import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    try {
      const formData = (await request.json()) as {
        email: string
        password: string
      }
      if (
        formData?.email === 'aaa123@naver.com' &&
        formData?.password === 'Qwer1234!'
      ) {
        return HttpResponse.json(
          { userId: 1, accessToken: 'dalkejoiauetaenaltkenl1j2an' },
          {
            headers: {
              'Set-Cookie': 'connect.sid=msw-cookie; HttpOnly; Path=/'
            }
          }
        )
      } else {
        return HttpResponse.json(
          { error: '로그인 정보를 다시 확인해주세요,' },
          { status: 405 }
        )
      }
    } catch (error) {
      console.error('Error handling request:', error)
      return HttpResponse.json(
        { error: '로그인 정보를 다시 확인해주세요,' },
        { status: 500 }
      )
    }
  }),
  http.post('/api/users/new', async ({ request }) => {
    const formData: any = await request.json()

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
  }),
  http.get('/api/users-email', async ({ request }) => {
    const url = new URL(request.url)

    const email = url.searchParams.get('email')
    if (email === 'aaa123@naver.com') {
      return HttpResponse.json(null, { status: 404 })
    } else {
      return HttpResponse.json(null, { status: 200 })
    }
  }),
  http.post('/api/kakao/oauth', async ({ request: req }) => {
    const data = (await req.json()) as unknown as { code: string }
    console.log('data', data, import.meta.env.VITE_KAKAO_CLIENT_ID)
    try {
      // 1. code로 카카오 API에 액세스 토큰 요청
      const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: 'http://localhost:9999/login/oauth/kakao',
          code: data!.code // 프론트에서 받은 code
        })
      })
      const tokenData = await tokenResponse.json()
      const { access_token } = tokenData
      console.log('tokenData', access_token, tokenData)
      // 2. 액세스 토큰을 사용해 사용자 정보 요청
      const userInfoResponse = await fetch(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      const user = await userInfoResponse.json()
      console.log(user, 'user')
      // 3. 사용자 정보 반환
      return HttpResponse.json({
        id: user.id,
        accessToken: access_token
      })
    } catch (error) {
      // 에러가 발생했을 경우
      return HttpResponse.json(
        { error: 'Failed to authenticate with Kakao' },
        { status: 500 }
      )
    }
  }),
  http.post('/api/naver/oauth', async ({ request: req }) => {
    const data = (await req.json()) as unknown as { code: string }
    console.log(
      'data',
      data,
      import.meta.env.VITE_NAVER_CLIENT_ID,
      import.meta.env.VITE_NAVER_CLIENT_SECRET
    )
    try {
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_NAVER_CLIENT_ID as string,
        client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET as string,
        redirect_uri: 'http://localhost:9999/login/oauth/naver',
        code: data.code // 프론트에서 받은 code
      })
      console.log(`https://nid.naver.com/oauth2.0/token?${params.toString()}`)

      return HttpResponse.json({
        id: 1,
        accessToken: '123124252523123'
      })
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to authenticate with Naver' },
        { status: 500 }
      )
    }
  }),
  http.post('/api/google/oauth', async ({ request: req }) => {
    const data = (await req.json()) as unknown as { code: string }

    try {
      console.log('google code', data.code)

      return HttpResponse.json({
        id: 1,
        accessToken: '123124252523123'
      })
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to authenticate with Naver' },
        { status: 500 }
      )
    }
  })
]
