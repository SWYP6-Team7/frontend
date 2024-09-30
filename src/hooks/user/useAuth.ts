import { authStore } from '@/store/client/authStore'
import useUser from './useUser'
import { axiosInstance } from '@/api'

interface IRegisterEmail {
  email: string
  password: string
  name: string
  gender: string

  agegroup: string
  // DB에서 현재 제외된 상태.
  // introduce: 'string'
  preferredTags: string[]
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
      const response = await axiosInstance.post('/api/login', {
        email,
        password
      })
      const data = response.data

      setLoginData({ userId: 1, accessToken: data.accessToken })
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }
  async function registerEmail(formData: IRegisterEmail): Promise<void> {
    try {
      const response = await axiosInstance.post('/api/users/new', formData)
      const data = response.data

      setLoginData({ userId: 1, accessToken: data.accessToken })
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
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
