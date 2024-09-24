import { ISearchData } from '@/model/search'
import { axiosInstance } from '.'

export async function getSearch(
  pageParams: number,
  keyword: string,
  tags: string[]
) {
  const response = await axiosInstance.get('/api/travel/search', {
    params: {
      keyword: keyword,
      page: pageParams,
      tags: tags.join(',')
    }
  })
  return response.data as ISearchData
}

export async function getSearchRelation(keyword: string) {
  const response = await axiosInstance.get('/api/travel/search/relation', {
    params: {
      keyword: keyword
    }
  })
  return response.data as string[]
}
