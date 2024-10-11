import { Community, PostCommunity } from './../model/community'
import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export async function getCommunities(accessToken: string) {
  try {
    const result = await axiosInstance.get(
      `/api/community/list`,

      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community[]
  } catch (err) {
    console.log(err)
  }
}

export async function getCommunity(
  communityNumber: number,
  accessToken: string
) {
  try {
    const result = await axiosInstance.get(
      `api/community/${communityNumber}`,

      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err) {
    console.log(err)
  }
}

export async function postCommunity(
  data: PostCommunity,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const result = await axiosInstance.post(`/api/community`, data, {
      headers: getJWTHeader(accessToken!)
    })
    return result.data as Community
  } catch (err) {
    console.log(err)
  }
}

export async function updateCommunity(
  data: PostCommunity,
  communityNumber: number,
  accessToken: string | null
) {
  try {
    const contentData = {
      categoryName: data.categoryName,
      title: data.title,
      content: data.content,
      files: data.files
    }
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const result = await axiosInstance.put(
      `/api/community/${communityNumber}`,
      contentData,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err) {
    console.log(err)
  }
}

export async function deleteCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.delete(`/api/community/${communityNumber}`, {
      headers: getJWTHeader(accessToken!)
    })
  } catch (err) {
    console.log(err)
  }
}

export async function likeCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.post(
      `/api/community/${communityNumber}/like`,
      {},
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err) {
    console.log(err)
  }
}

export async function unlikeCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.post(
      `/api/community/${communityNumber}/like`,
      {},
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err) {
    console.log(err)
  }
}
