// src/userStore.ts
import { create } from 'zustand'

interface tripDetailState {
  travelNumber: number
  addTravelNumber: (travelNumber: number) => void
  userNumber: number
  addUserNumber: (userNumber: number) => void
  userName: string
  addUserName: (userName: string) => void
  createdAt: string
  addCreatedAt: (createdAt: string) => void
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
  postStatus: string
  addPostStatus: (postStatus: string) => void
  applyPerson: number
  addApplyPerson: (applyPerson: number) => void
  interestPerson: number
  addInterestPerson: (interestPerson: number) => void
  views: number
  addViews: (views: number) => void
  isOwner: boolean
  addIsOwner: (isOwner: boolean) => void
  canApply: boolean
  addCanApply: (canApply: boolean) => void
}

export const tripDetailStore = create<tripDetailState>(set => ({
  travelNumber: 0,
  addTravelNumber: (travelNumber: number) => set({ travelNumber }),

  userNumber: 0,
  addUserNumber: (userNumber: number) => set({ userNumber }),

  userName: '',
  addUserName: (userName: string) => set({ userName }),

  createdAt: '',
  addCreatedAt: (createdAt: string) => set({ createdAt }),

  location: '',
  addLocation: (location: string) => set({ location }),

  title: '',
  addTitle: (title: string) => set({ title }),

  details: '',
  addDetails: (details: string) => set({ details }),

  maxPerson: 0,
  addMaxPerson: (maxPerson: number) => set({ maxPerson }),

  genderType: '',
  addGenderType: (genderType: string) => set({ genderType }),

  dueDate: '',
  addDueDate: (dueDate: string) => set({ dueDate }),

  periodType: '',
  addPeriodType: (periodType: string) => set({ periodType }),

  tags: [],
  addTags: (tags: string[]) => set({ tags }),

  postStatus: '',
  addPostStatus: (postStatus: string) => set({ postStatus }),

  applyPerson: 0,
  addApplyPerson: (applyPerson: number) => set({ applyPerson }),

  interestPerson: 0,
  addInterestPerson: (interestPerson: number) => set({ interestPerson }),

  views: 0,
  addViews: (views: number) => set({ views }),

  isOwner: false,
  addIsOwner: (isOwner: boolean) => set({ isOwner }),

  canApply: false,
  addCanApply: (canApply: boolean) => set({ canApply })
}))
