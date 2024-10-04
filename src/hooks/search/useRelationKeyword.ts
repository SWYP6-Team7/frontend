import { getSearchRelation } from '@/api/search'
import { authStore } from '@/store/client/authStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useRelationKeyword = (keyword: string) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)
  const { accessToken } = authStore()
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', 'relation', debouncedKeyword],
    queryFn: () => getSearchRelation(debouncedKeyword, accessToken!),
    enabled: keyword !== '' && !!accessToken
  })

  useEffect(() => {
    // 디바운스 처리 (1초)
    const handler = setTimeout(() => {
      if (keyword.length > 0) {
        // keyword가 완성형 한글인지, 영어 대,소문자인지 체크
        if (
          (keyword.charCodeAt(keyword.length - 1) >= 0xac00 &&
            keyword.charCodeAt(keyword.length - 1) <= 0xd7a3) ||
          (keyword.charCodeAt(keyword.length - 1) >= 65 &&
            keyword.charCodeAt(keyword.length - 1) <= 90) ||
          (keyword.charCodeAt(keyword.length - 1) >= 97 &&
            keyword.charCodeAt(keyword.length - 1) <= 122)
        ) {
          setDebouncedKeyword(keyword)
        }
      }
    }, 1000)
    return () => {
      clearTimeout(handler)
    }
  }, [keyword])
  return { data, isLoading, error }
}

export default useRelationKeyword
