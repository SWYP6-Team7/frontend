export function getJWTHeader(accessToken: string): Record<string, string> {
  return { Authorization: `Bearer ${accessToken}` }
}

export const generateUserKey = (userId: number, accessToken: string) => {
  return ['user', userId, accessToken]
}
