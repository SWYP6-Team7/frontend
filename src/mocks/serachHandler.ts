import { http, HttpResponse } from 'msw'
import {
  cities,
  NoSearchData,
  SearchData1,
  SearchData2,
  SearchData3
} from './data'

export const searchHandler = [
  http.get('/api/travel/search', async ({ request }) => {
    const url = new URL(request.url)

    const tags = url.searchParams.get('tags')
    const keyword = url.searchParams.get('keyword')
    const pageParams = url.searchParams.get('page')
    console.log('pageParams', pageParams)
    if (Number(pageParams) === 0) {
      return HttpResponse.json(SearchData1)
    } else if (Number(pageParams) === 1) {
      return HttpResponse.json(SearchData2)
    } else if (Number(pageParams) === 2) {
      return HttpResponse.json(SearchData3)
    } else {
      return HttpResponse.json(NoSearchData)
    }
  }),
  http.get('/api/autocomplete', async ({ request }) => {
    const url = new URL(request.url)
    const keyword = url.searchParams.get('location') ?? ''

    // keyword를 포함하는 도시만 필터링
    const filteredCities = cities.filter(city =>
      city.toLowerCase().includes(keyword)
    )

    // 응답으로 필터된 도시 배열 반환
    return HttpResponse.json(filteredCities)
  })
]
