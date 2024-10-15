import { Community, Image, PostCommunity } from './../model/community'
import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { EditImage, UploadImage } from '@/store/client/imageStore'

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
      content: data.content
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

export async function getImages(communityNumber: number, accessToken: string) {
  try {
    const result = await axiosInstance.get(
      `api/community/${communityNumber}/images`,

      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Image[]
  } catch (err) {
    console.log(err)
  }
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axiosInstance.post(
      'api/community/images/temp',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export async function updateImage(
  data: EditImage[],
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const result = await axiosInstance.put(
      `/api/community/${communityNumber}/images`,
      data,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err) {
    console.log(err)
  }
}

export async function postImage(
  data: UploadImage[],
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const result = await axiosInstance.post(
      `/api/community/${communityNumber}/images`,
      data,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err) {
    console.log(err)
  }
}
