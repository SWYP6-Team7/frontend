import {
  cancelEnrollment,
  getEnrollments,
  postEnrollment
} from '@/api/enrollment'
import { IPostEnrollment } from '@/model/enrollment'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useEnrollment = (travelNumber: number) => {
  const { userId, accessToken } = authStore()

  const enrollmentList = useQuery({
    queryKey: ['enrollment', travelNumber],
    queryFn: () => getEnrollments(travelNumber, accessToken),
    enabled: !!travelNumber && !!accessToken
  })

  const queryClient = useQueryClient()
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

  return { apply, cancel, cancelMutation, applyMutation, enrollmentList }
}

export default useEnrollment
