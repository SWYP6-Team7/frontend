import { getMyPage, putMyPage } from '@/api/myPage'
import { authStore } from '@/store/client/authStore'
import { myPageStore } from '@/store/client/myPageStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useMyPage = () => {
  const { userId, accessToken } = authStore()
  const { name, preferredTags } = myPageStore()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['myPage'],
    queryFn: () => getMyPage(accessToken!),
    enabled: !!accessToken
  })

  const { mutateAsync: updateMyPageMutation, isSuccess: isUpdatedSuccess } =
    useMutation({
      mutationFn: () => {
        return putMyPage(accessToken!, name, '', preferredTags)
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
