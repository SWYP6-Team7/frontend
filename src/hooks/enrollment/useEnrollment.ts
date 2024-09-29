import {
  acceptEnrollment,
  cancelEnrollment,
  getEnrollments,
  postEnrollment,
  rejectEnrollment
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

  const queryClient = useQueryClient()
  // 주최자 - 참가 신청 거절

  const { mutateAsync: enrollmentRejectionMutate } = useMutation({
    mutationFn: (enrollmentNumber: number) => {
      return rejectEnrollment(enrollmentNumber, accessToken)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['enrollment', travelNumber]
      })
    }
  })

  // 주최자 - 참가신청 수락
  const { mutateAsync: enrollmentAcceptanceMutate } = useMutation({
    mutationFn: (enrollmentNumber: number) => {
      return acceptEnrollment(enrollmentNumber, accessToken)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['enrollment', travelNumber]
      })
    }
  })
  const applyMutation = useMutation({
    mutationFn: (data: IPostEnrollment) => postEnrollment(data, accessToken)
  })

  const apply = (data: IPostEnrollment) => {
    return applyMutation.mutateAsync(data, {
      onSuccess: () => {
        if (!enrollmentList.data) {
          queryClient.invalidateQueries({
            queryKey: ['enrollment', travelNumber]
          })
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
          queryClient.invalidateQueries({
            queryKey: ['enrollment', travelNumber]
          })
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
    enrollmentAcceptanceMutate
  }
}

export default useEnrollment
