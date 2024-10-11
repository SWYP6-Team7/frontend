import {
  deleteMyAccount,
  getMyPage,
  getMyProfileImage,
  postMyProfilImg,
  postVerifyPassword,
  putMyPage,
  putPassword
} from '@/api/myPage'
import { NewPasswordProps } from '@/model/myPages'
import { authStore } from '@/store/client/authStore'
import { myPageStore } from '@/store/client/myPageStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useMyPage = () => {
  const { userId, accessToken } = authStore()
  const { name, preferredTags, agegroup } = myPageStore()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(accessToken!),
    enabled: !!accessToken
  })

  const { mutateAsync: updateMyPageMutation, isSuccess: isUpdatedSuccess } =
    useMutation({
      mutationFn: () => {
        return putMyPage(accessToken!, name, '', preferredTags, agegroup)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['myPage']
        })
      }
    })
  // 비밀번호 변경시 현재 비밀번호 확인
  const { mutateAsync: verifyPasswordMutation, isSuccess: isVerified } =
    useMutation({
      mutationFn: (password: string) => {
        return postVerifyPassword(accessToken!, password)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['myPage']
        })
      }
    })
  const { mutateAsync: updatePasswordMutation, isSuccess: isUpatedPassword } =
    useMutation({
      mutationFn: (formData: NewPasswordProps) => {
        return putPassword(
          accessToken!,
          formData.newPassword,
          formData.newPassword
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['myPage']
        })
      }
    })

  // 사진을 업로드 해서 response의 url를 통해 화면에 보여주기.

  const { data: profileImage, isLoading: isLoadingImage } = useQuery({
    queryKey: ['profileImg'],
    queryFn: () => getMyProfileImage(userId!),
    enabled: !!accessToken
  })
  const {
    mutateAsync: uploadMyProfileImgMutation,
    isSuccess: isUploadSuccess,
    data: resultURL
  } = useMutation({
    mutationFn: (formData: FormData) => {
      return postMyProfilImg(userId!, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileImg']
      })
    }
  })

  const { mutateAsync: withdrawMutation, isSuccess: isWithDrawSuccess } =
    useMutation({
      mutationFn: () => {
        return deleteMyAccount(userId!, accessToken!)
      }
    })
  return {
    withdrawMutation,
    isWithDrawSuccess,
    data,
    isLoading,
    updateMyPageMutation,
    isUpdatedSuccess,
    uploadMyProfileImgMutation,
    isUploadSuccess,
    resultURL,
    profileImage,
    isLoadingImage,
    verifyPasswordMutation,
    isVerified,
    updatePasswordMutation,
    isUpatedPassword
  }
}
export default useMyPage
