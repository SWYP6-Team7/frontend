import { authStore } from '@/store/client/authStore'
import useUser from './useUser'

interface IRegisterEmail {
  email: 'string'
  password: 'string'
  name: 'string'
  gender: 'string'
  phone: 'string'
  birthYear: 'string'
  introduce: 'string'
  tags: { tagName: 'string' }[]
}

// 로그인, 로그아웃, 이메일회원가입까지 구현
// 인증 부분을 처리하는 커스텀 훅
const useAuth = () => {
  const { updateUser, clearUser } = useUser()
  const { setLoginData, clearLoginData } = authStore()

  async function loginEmail({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<void> {
    try {
      const response = await fetch('/api/users/new', {
        body: JSON.stringify({ email, password }),
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('서버 응답 오류: ' + response.statusText)
      }
      const data = await response.json()

      setLoginData({ userId: data.userId, accessToken: data.accessToken })
    } catch (error: any) {
      console.error(error)
    }
  }
  async function registerEmail(formData: IRegisterEmail): Promise<void> {
    try {
      const response = await fetch('/api/users/new', {
        body: JSON.stringify(formData),
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('서버 응답 오류: ' + response.statusText)
      }
      const data = await response.json()

      setLoginData({ userId: data.userId, accessToken: data.accessToken })
    } catch (error: any) {
      console.error(error)
    }
  }

  function logout(): void {
    clearUser()
    clearLoginData()
  }

  return {
    loginEmail,
    registerEmail,
    logout
  }
}

export default useAuth
