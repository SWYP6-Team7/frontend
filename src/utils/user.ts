import { authStore } from '@/store/client/authStore'

export function getJWTHeader(accessToken: string): Record<string, string> {
  return { Authorization: `Bearer ${accessToken}` }
}

export const generateUserKey = (userId: number, accessToken: string) => {
  return ['user', userId, accessToken]
}

export const isGuestUser = () => {
  const accessToken = authStore.getState().accessToken
  if (accessToken === null) return true
  return false
}
