import { create } from 'zustand'

interface IAuthStore {
  userId: number | null
  accessToken: string | null
  setLoginData: ({
    userId,
    accessToken
  }: {
    userId: number
    accessToken: string
  }) => void
  clearLoginData: () => void
}

// userId와 accessToken을 전역 상태로 관리하는 역할
export const authStore = create<IAuthStore>(set => ({
  userId: 1,
  accessToken: 'null',
  setLoginData: ({ userId, accessToken }) => {
    set(state => ({ userId, accessToken }))
  },
  clearLoginData: () => {
    set(state => ({ userId: null, accessToken: null }))
  }
}))
