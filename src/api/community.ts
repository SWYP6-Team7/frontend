import {
  Community,
  ICommunityList,
  Image,
  PostCommunity
} from './../model/community'
import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import {
  EditFinalImages,
  EditImage,
  FinalImages,
  UploadImage
} from '@/store/client/imageStore'
import { IListParams } from '@/hooks/useCommunity'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import RequestError from '@/context/ReqeustError'

export async function getCommunities(
  accessToken: string | null,
  params: IListParams & { page: number }
) {
  try {
    const result = await axiosInstance.get(
      `/api/community/posts`,

      {
        params: params,
        ...(accessToken && { headers: getJWTHeader(accessToken) })
      }
    )
    return result.data
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function getMyCommunities(
  accessToken: string | null,
  params: IListParams & { page: number }
) {
  try {
    const result = await axiosInstance.get(
      `/api/my-communities`,

      {
        params: params,
        ...(accessToken && { headers: getJWTHeader(accessToken) })
      }
    )
    return result.data
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function getCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    const result = await axiosInstance.get(
      `api/community/posts/${communityNumber}`,

      {
        ...(accessToken && { headers: getJWTHeader(accessToken) })
      }
    )
    return result.data as Community
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function postCommunity(
  data: PostCommunity,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    const result = await axiosInstance.post(`/api/community/posts`, data, {
      headers: getJWTHeader(accessToken!)
    })
    return result.data as Community
  } catch (err: any) {
    throw new RequestError(err)
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
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    const result = await axiosInstance.put(
      `/api/community/posts/${communityNumber}`,
      contentData,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function deleteCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    return axiosInstance.delete(`/api/community/posts/${communityNumber}`, {
      headers: getJWTHeader(accessToken!)
    })
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function likeCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    return axiosInstance.post(
      `/api/community/${communityNumber}/like`,
      {},
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function unlikeCommunity(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    return axiosInstance.post(
      `/api/community/${communityNumber}/like`,
      {},
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function getImages(
  communityNumber: number,
  accessToken: string | null
) {
  try {
    const result = await axiosInstance.get(
      `api/community/${communityNumber}/images`,

      {
        ...(accessToken && { headers: getJWTHeader(accessToken) })
      }
    )
    return result.data as Image[]
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export const uploadImage = async (file: File, accessToken: string) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axiosInstance.post(
      'api/community/images/temp',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function updateImage(
  data: EditFinalImages,
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    const result = await axiosInstance.put(
      `/api/community/${communityNumber}/images`,
      data,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export async function postImage(
  data: FinalImages,
  communityNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin)
    const result = await axiosInstance.post(
      `/api/community/${communityNumber}/images`,
      data,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
    return result.data as Community
  } catch (err: any) {
    throw new RequestError(err)
  }
}
