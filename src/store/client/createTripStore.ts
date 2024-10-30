// src/userStore.ts
import { getCurrentFormattedDate } from '@/utils/time'
import { create } from 'zustand'

type Gender = 'F' | 'M' | ''

interface CreateTripState {
  location: string
  addLocation: (location: string) => void
  title: string
  addTitle: (title: string) => void
  details: string
  addDetails: (details: string) => void
  maxPerson: number
  addMaxPerson: (maxPerson: number) => void
  genderType: string
  addGenderType: (genderType: string) => void
  dueDate: string
  addDueDate: (dueDate: string) => void
  periodType: string
  addPeriodType: (periodType: string) => void
  tags: string[]
  addTags: (tags: string[]) => void
  completionStatus: boolean
  addCompletionStatus: (completionStatus: boolean) => void
}

export const createTripStore = create<CreateTripState>(set => ({
  title: '',
  addTitle: title => {
    set({ title })
  },
  location: '',
  addLocation: location => {
    set({ location })
  },
  details: '',
  addDetails: details => {
    set({ details })
  },
  maxPerson: 1,
  addMaxPerson: maxPerson => {
    set({ maxPerson })
  },
  genderType: '',
  addGenderType: genderType => {
    set({ genderType })
  },
  dueDate: getCurrentFormattedDate().split(' ')[0], // 혹시 유저가 마감일 지정일을 따로 설정안하고 당일로 한다면, 오늘 날짜로 들어가도록.
  addDueDate: dueDate => {
    const [year, month, day] = dueDate.split('-')
    const formattedMonth = month.padStart(2, '0')
    const formattedDay = day.padStart(2, '0')

    set({ dueDate: `${year}-${formattedMonth}-${formattedDay}` })
  },
  periodType: '',
  addPeriodType: periodType => {
    set({ periodType })
  },
  tags: [],
  addTags: tags => {
    set({ tags })
  },
  completionStatus: true,
  addCompletionStatus: completionStatus => {
    set({ completionStatus })
  }
}))
