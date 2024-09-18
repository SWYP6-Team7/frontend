import { create } from 'zustand'

interface ISearchStore {
  sort: '추천순' | '최신순' | '등록일순' | '정확도순'
  setSort: (sort: '추천순' | '최신순' | '등록일순' | '정확도순') => void
}

// userId와 accessToken을 전역 상태로 관리하는 역할
export const searchStore = create<ISearchStore>(set => ({
  sort: '최신순',
  setSort: sort => {
    set({ sort })
  }
}))
