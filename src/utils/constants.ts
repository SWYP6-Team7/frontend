export const redirectUri = 'http://localhost:9999/login/oauth/kakao'

export const KAKAO_LINK = `http://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`

export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID // 발급받은 클라이언트 아이디
export const NAVER_REDIRECT_URI = 'http://localhost:9999/login/oauth/naver' // Callback URL
export const STATE = 'develop'
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`
