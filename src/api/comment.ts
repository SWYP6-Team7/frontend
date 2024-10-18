import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { IComment, ICommentPost } from '@/model/comment'

export async function getComments(
  relatedType: 'travel' | 'community',
  relatedNumber: number,
  accessToken: string | null,
  page: number
) {
  try {
    // if (!accessToken) throw new Error('로그인을 해주세요.')
    const result = await axiosInstance.get(
      `/api/${relatedType}/${relatedNumber}/comments`,
      {
        headers: getJWTHeader(accessToken!),
        params: { page }
      }
    )

    return result.data
  } catch (err) {
    console.log(err)
  }
}

export async function postComment(
  data: ICommentPost,
  relatedType: 'travel' | 'community',
  relatedNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.post(
      `/api/${relatedType}/${relatedNumber}/comments`,
      data,
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err) {
    console.log(err)
  }
}

export async function updateComment(
  data: { content: string; commentNumber: number },
  commentNumber: number,
  accessToken: string | null
) {
  try {
    const contentData = { content: data.content }
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.put(`/api/comments/${commentNumber}`, contentData, {
      headers: getJWTHeader(accessToken!)
    })
  } catch (err) {
    console.log(err)
  }
}

export async function deleteComment(
  commentNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.delete(`/api/comments/${commentNumber}`, {
      headers: getJWTHeader(accessToken!)
    })
  } catch (err) {
    console.log(err)
  }
}

export async function likeComment(
  commentNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.post(
      `/api/comment/${commentNumber}/like`,
      {},
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err) {
    console.log(err)
  }
}

export async function unlikeComment(
  commentNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.post(
      `/api/comment/${commentNumber}/like`,
      {},
      {
        headers: getJWTHeader(accessToken!)
      }
    )
  } catch (err) {
    console.log(err)
  }
}
