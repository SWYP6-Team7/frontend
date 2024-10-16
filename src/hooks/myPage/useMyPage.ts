import {
  deleteMyAccount,
  deleteMyProfileImage,
  getMyPage,
  getMyProfileImage,
  intialPostMyProfileImage,
  postVerifyPassword,
  putMyPage,
  putMyProfileDefaultImage,
  putMyProfileImage,
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

  // 마이페이지 프로필 이미지 부분
  // 사진을 업로드 해서 response의 url를 통해 화면에 보여주기.

  // 첫 프로필 기본으로 post 요청

  const {
    mutateAsync: firstProfileImageMutation,
    isSuccess: isFirstProfileImagePostSuccess
  } = useMutation({
    mutationFn: (accessToken: string) => {
      return intialPostMyProfileImage(accessToken!)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileImg']
      })
    }
  })
  // 현재 프로필 조회.
  const { data: profileImage, isLoading: isLoadingImage } = useQuery({
    queryKey: ['profileImg'],
    queryFn: () => getMyProfileImage(accessToken!),
    enabled: !!accessToken
  })
  // 커스텀 이미지로 update
  const {
    mutateAsync: updateProfileImgMutation,
    isSuccess: isUpdateProfileImgSuccess
  } = useMutation({
    mutationFn: (formData: FormData) => {
      return putMyProfileImage(accessToken!, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileImg']
      })
    }
  })
  //default 이미지로 update
  const {
    mutateAsync: updateDefaultProfileImgMutation,
    isSuccess: isUpdateDefaultProfileImgSuccess
  } = useMutation({
    mutationFn: (defaultNumber: number) => {
      return putMyProfileDefaultImage(accessToken!, defaultNumber)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileImg']
      })
    }
  })
  // 프로필 이미지 db에서 삭제.
  const {
    mutateAsync: deleteMyProfileImgMutation,
    isSuccess: isDeleteSuccessProfileImg
  } = useMutation({
    mutationFn: () => {
      return deleteMyProfileImage(accessToken!)
    }
  })
  const { mutateAsync: withdrawMutation, isSuccess: isWithDrawSuccess } =
    useMutation({
      mutationFn: () => {
        return deleteMyAccount(accessToken!)
      }
    })

  return {
    withdrawMutation,
    isWithDrawSuccess,
    data,
    isLoading,
    updateMyPageMutation,
    isUpdatedSuccess,

    isLoadingImage,
    verifyPasswordMutation,
    isVerified,
    updatePasswordMutation,
    isUpatedPassword,

    profileImage,
    firstProfileImageMutation,
    isFirstProfileImagePostSuccess,
    updateProfileImgMutation,
    isUpdateProfileImgSuccess,
    updateDefaultProfileImgMutation,
    isUpdateDefaultProfileImgSuccess,
    deleteMyProfileImgMutation,
    isDeleteSuccessProfileImg
  }
}
export default useMyPage
