import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export const getMyPage = (accessToken: string) => {
  return axiosInstance.get('/api/profile/me', {
    headers: getJWTHeader(accessToken)
  })
}

export const getMyProfileImage = (userId: number, accessToken: string) => {
  return axiosInstance.get(`api/profile/${userId}/image`, {
    headers: getJWTHeader(accessToken)
  })
}

// 배포 후에 더 추가하기.
export const putMyPage = (
  accessToken: string,
  name: string,
  proIntroduce: string,
  preferredTags: string[],
  ageGroup: string
) => {
  return axiosInstance.put(
    '/api/profile/update',
    {
      name,
      proIntroduce,
      preferredTags,
      ageGroup
    },
    {
      headers: getJWTHeader(accessToken)
    }
  )
}

// 최근 열람 조회
export async function postMyProfilImg(userId: number, formData: FormData) {
  try {
    if (!userId) throw new Error('로그인을 해주세요.')
    const response = await axiosInstance.post(
      `api/image/profile/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  } catch (err) {
    console.log(err)
  }
}
// 탈퇴하기
export async function deleteMyAccount(accessToken: string) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const response = await axiosInstance.delete('/api/user/delete', {
      headers: getJWTHeader(accessToken)
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
// 비번 확인 조회
export async function postVerifyPassword(
  accessToken: string,
  password: string
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const response = await axiosInstance.post(
      '/api/password/verify',
      {
        confirmPassword: password
      },
      {
        headers: getJWTHeader(accessToken)
      }
    )

    return response.data
  } catch (err) {
    console.log(err)
  }
}

export async function putPassword(
  accessToken: string,
  newPassword: string,
  newPasswordConfirm: string
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const response = await axiosInstance.put(
      '/api/profile/password/change',
      {
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm
      },
      {
        headers: getJWTHeader(accessToken)
      }
    )

    return response.data
  } catch (err) {
    console.log(err)
  }
}
