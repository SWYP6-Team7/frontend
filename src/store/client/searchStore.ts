import { create } from 'zustand'

export type IPlace = '국내' | '해외'
export type IPeriod = '일주일 이하' | '1~4주' | '한달 이상'
export type IPeople = '2인' | '3인' | '4인' | '5인이상'
export type IStyle = '여유' | '도시' | '액티비티' | '전통' | '가성비'

interface ISearchStore {
  sort: '추천순' | '최신순' | '등록일순' | '정확도순'
  keyword: string
  setKeyword: (keyword: string) => void
  setSort: (sort: '추천순' | '최신순' | '등록일순' | '정확도순') => void
  place: IPlace[]
  people: IPeople[]
  period: IPeriod[]
  style: IStyle[]
  setFilter: (
    type: '장소' | '인원' | '기간' | '스타일',
    value: IPeople[] | IPeriod[] | IStyle[] | IPlace[]
  ) => void
  setReset: () => void
  setOneFilterReset: (type: '장소' | '인원' | '기간' | '스타일') => void
}

// userId와 accessToken을 전역 상태로 관리하는 역할
export const searchStore = create<ISearchStore>((set, get) => ({
  sort: '최신순' as '최신순',
  keyword: '',
  place: [],
  period: [],
  people: [],
  style: [],
  setKeyword: keyword => {
    set({ keyword })
  },
  setSort: sort => {
    set({ sort })
  },
  setFilter: (type, value) => {
    const currentFilters = get()

    if (type === '장소') {
      const updatedPlace = toggleFilter(currentFilters.place, value as IPlace[])
      set({ place: updatedPlace })
    } else if (type === '인원') {
      const updatedPeople = toggleFilter(
        currentFilters.people,
        value as IPeople[]
      )
      set({ people: updatedPeople })
    } else if (type === '기간') {
      const updatedPeriod = toggleFilter(
        currentFilters.period,
        value as IPeriod[]
      )
      set({ period: updatedPeriod })
    } else if (type === '스타일') {
      const updatedStyle = toggleFilter(currentFilters.style, value as IStyle[])
      set({ style: updatedStyle })
    }
  },
  setReset: () => {
    set({ people: [], period: [], style: [], place: [] })
  },
  setOneFilterReset: type => {
    if (type === '장소') {
      set({ place: [] })
    } else if (type === '인원') {
      set({ people: [] })
    } else if (type === '기간') {
      set({ period: [] })
    } else if (type === '스타일') {
      set({ style: [] })
    }
  }
}))

function toggleFilter<T>(currentFilters: T[] = [], value: T[]): T[] {
  return currentFilters.includes(value[0])
    ? currentFilters.filter(v => v !== value[0])
    : [...currentFilters, value[0]]
}
