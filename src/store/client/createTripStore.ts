// src/userStore.ts
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
  maxPerson: 0,
  addMaxPerson: maxPerson => {
    set({ maxPerson })
  },
  genderType: '',
  addGenderType: genderType => {
    set({ genderType })
  },
  dueDate: '',
  addDueDate: dueDate => {
    set({ dueDate })
  },
  periodType: '',
  addPeriodType: periodType => {
    set({ periodType })
  },
  tags: [],
  addTags: tags => {
    set({ tags })
  },
  completionStatus: false,
  addCompletionStatus: completionStatus => {
    set({ completionStatus })
  }
}))
