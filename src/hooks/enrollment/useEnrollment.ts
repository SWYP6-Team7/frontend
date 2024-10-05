import {
  acceptEnrollment,
  cancelEnrollment,
  getEnrollments,
  postEnrollment,
  rejectEnrollment,
  getLastViewed,
  putLastViewed
} from '@/api/enrollment'
import { IPostEnrollment } from '@/model/enrollment'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useEnrollment = (travelNumber: number) => {
  const { userId, accessToken } = authStore()
  // 주최자 - 목록 조회
  const enrollmentList = useQuery({
    queryKey: ['enrollment', travelNumber],
    queryFn: () => getEnrollments(travelNumber, accessToken),
    enabled: !!travelNumber && !!accessToken
  })
  // 주최자 - 가장 최근에 봤던 글.

  const enrollmentsLastViewed = useQuery({
    queryKey: ['enrollmentLastViewed', travelNumber],
    queryFn: () => getLastViewed(travelNumber, accessToken),
    enabled: !!travelNumber && !!accessToken
  })

  const queryClient = useQueryClient()
  // 최근 열람 시점 업데이트.

  const { mutateAsync: updateLastViewed } = useMutation({
    mutationFn: (viewedAt: string) => {
      return putLastViewed(travelNumber, accessToken, viewedAt)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['enrollmentLastViewed', travelNumber]
      })
    }
  })

  const { mutateAsync: enrollmentRejectionMutate } = useMutation({
    mutationFn: (enrollmentNumber: number) => {
      return rejectEnrollment(enrollmentNumber, accessToken)
    },
    onSuccess: () => {
      // 완료 토스트 메시지를 보여주기 위해 약간의 delay
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['enrollment', travelNumber]
        })
        queryClient.invalidateQueries({
          queryKey: ['tripDetail', travelNumber]
        })
      }, 1300)
    }
  })

  // 주최자 - 참가신청 수락
  const { mutateAsync: enrollmentAcceptanceMutate } = useMutation({
    mutationFn: (enrollmentNumber: number) => {
      return acceptEnrollment(enrollmentNumber, accessToken)
    },
    onSuccess: () => {
      // 완료 수락 모달 메시지를 보여주기 위해 약간의 delay
      console.log('123')
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['enrollment', travelNumber]
        })
        queryClient.invalidateQueries({
          queryKey: ['tripDetail', travelNumber]
        })
      }, 1300)
    }
  })
  const applyMutation = useMutation({
    mutationFn: (data: IPostEnrollment) => postEnrollment(data, accessToken)
  })

  const apply = (data: IPostEnrollment) => {
    return applyMutation.mutateAsync(data, {
      onSuccess: () => {
        if (!enrollmentList.data) {
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: ['enrollment', travelNumber]
            })
          }, 1500)
        }
      }
    })
  }

  const cancelMutation = useMutation({
    mutationFn: (enrollmentNumber: number) =>
      cancelEnrollment(enrollmentNumber, accessToken)
  })

  const cancel = (enrollmentNumber: number) => {
    return cancelMutation.mutateAsync(enrollmentNumber, {
      onSuccess: () => {
        if (!enrollmentList.data) {
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: ['enrollment', travelNumber]
            })
          }, 1500)
        }
      }
    })
  }

  return {
    apply,
    cancel,
    cancelMutation,
    applyMutation,
    enrollmentList,
    enrollmentRejectionMutate,
    enrollmentAcceptanceMutate,
    enrollmentsLastViewed,
    updateLastViewed
  }
}

export default useEnrollment
