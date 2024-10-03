import { getMyPage, putMyPage } from '@/api/myPage'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useMyPage = () => {
  const { userId, accessToken } = authStore()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(accessToken!),
    enabled: !!accessToken
  })

  const { mutateAsync: updateMyPageMutation, isSuccess: isUpdatedSuccess } =
    useMutation({
      mutationFn: (name: string) => {
        return putMyPage(accessToken!, name)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['myPage']
        })
      }
    })
  return { data, isLoading, updateMyPageMutation, isUpdatedSuccess }
}
export default useMyPage
