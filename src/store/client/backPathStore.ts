import { create } from 'zustand'

interface IBackPathStore {
  searchTravel: '/' | '/trip/list'
  setSearchTravel: (searchTravel: '/' | '/trip/list') => void
  notification: string
  setNotification: (path: string) => void
  createTripPlace: '/' | '/trip/list'
  setCreateTripPlace: (path: '/' | '/trip/list') => void
  travelDetail: string
  setTravelDetail: (path: string) => void
}

export const useBackPathStore = create<IBackPathStore>(set => ({
  searchTravel: '/',
  setSearchTravel: searchTravel => {
    set({ searchTravel })
  },
  notification: '/',
  setNotification: path => {
    set({ notification: path })
  },
  createTripPlace: '/',
  setCreateTripPlace: path => {
    set({ createTripPlace: path })
  },
  travelDetail: '/trip/list',
  setTravelDetail: path => {
    set({ travelDetail: path })
  }
}))
