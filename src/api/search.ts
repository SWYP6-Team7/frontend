import { ISearchData } from '@/model/search'
import { axiosInstance } from '.'
import { Filters } from '@/hooks/search/useSearch'

export async function getSearch(
  pageParams: number,
  keyword: string,
  filters: Filters
) {
  const { tags, period, person, gender, location } = filters
  const response = await axiosInstance.get('/api/travel/search', {
    params: {
      keyword: keyword,
      page: pageParams,
      tags: tags.join(','),
      perios: period.join(','),
      person: person.join(','),
      gender: gender.join(','),
      location: location.join(',')
    }
  })
  return response.data as ISearchData
}

export async function getSearchRelation(keyword: string) {
  try {
    const response = await axiosInstance.get('/api/autocomplete', {
      params: {
        location: keyword
      }
    })
    console.log('data', response)
    return response.data as string[]
  } catch (err) {
    console.error(err)
  }
}
