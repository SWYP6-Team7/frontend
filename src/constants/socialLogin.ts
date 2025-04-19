export const redirectUri = `${process.env.NEXT_PUBLIC_FRONT_URL}/login/oauth/kakao/callback`;

export const KAKAO_LINK = `http://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;

export const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
export const NAVER_REDIRECT_URI = `${process.env.NEXT_PUBLIC_FRONT_URL}/login/oauth/naver/callback`; // Callback URL
export const STATE = "develop";
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;

export const GOOGLE_REDIRECT_URI = `${process.env.NEXT_PUBLIC_FRONT_URL}/login/oauth/google/callback`;

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_LINK = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${GOOGLE_CLIENT_ID}
		&redirect_uri=${GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
