// src/userStore.ts
import { create } from 'zustand'
const date = new Date()
const year: number = date.getFullYear()
const month: number = date.getMonth() + 1
const day = date.getDate()

interface DateValue {
  year: number
  month: number
  day: number
}

interface tripDetailState {
  profileUrl: string
  addProfileUrl: (profileUrl: string) => void
  travelNumber: number
  addTravelNumber: (travelNumber: number) => void
  userNumber: number
  addUserNumber: (userNumber: number) => void
  userName: string
  addUserName: (userName: string) => void
  userAgeGroup: string
  addUserAgeGroup: (ageGroup: string) => void
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
  nowPerson: number
  addNowPerson: (nowPerson: number) => void
  genderType: string
  addGenderType: (genderType: string) => void
  dueDate: DateValue
  addDueDate: (dueDate: DateValue) => void
  periodType: string
  addPeriodType: (periodType: string) => void
  tags: string[]
  addTags: (tags: string[]) => void
  postStatus: string
  addPostStatus: (postStatus: string) => void
  enrollCount: number
  addEnrollCount: (enrollCount: number) => void
  bookmarkCount: number
  addBookmarkCount: (bookmarkCount: number) => void
  viewCount: number
  addViewCount: (viewCount: number) => void
  hostUserCheck: boolean
  addHostUserCheck: (hostUserCheck: boolean) => void
  enrollmentNumber: number | null
  addEnrollmentNumber: (enrollmentNumber: number | null) => void
  applySuccess: boolean
  setApplySuccess: (status: boolean) => void
  bookmarked: boolean
  addBookmarked: (status: boolean) => void
  commentLength: number
  addCommentLength: (status: number) => void
}

export const tripDetailStore = create<tripDetailState>(set => ({
  bookmarked: false,
  addBookmarked: status => {
    set({ bookmarked: status })
  },
  applySuccess: false,
  setApplySuccess: status => {
    set({ applySuccess: status })
  },

  travelNumber: 0,
  addTravelNumber: (travelNumber: number) => set({ travelNumber }),
  userAgeGroup: '',
  addUserAgeGroup: (userAgeGroup: string) => set({ userAgeGroup }),
  profileUrl: '',
  addProfileUrl: (profileUrl: string) => {
    set({ profileUrl })
  },
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

  maxPerson: 1,
  addMaxPerson: (maxPerson: number) => set({ maxPerson }),
  nowPerson: 0,
  addNowPerson: (nowPerson: number) => set({ nowPerson }),

  genderType: '여자만',
  addGenderType: (genderType: string) => set({ genderType }),

  dueDate: { year, month, day },
  addDueDate: (dueDate: DateValue) => set({ dueDate }),

  periodType: '',
  addPeriodType: (periodType: string) => set({ periodType }),

  tags: [],
  addTags: (tags: string[]) => set({ tags }),

  postStatus: '',
  addPostStatus: (postStatus: string) => set({ postStatus }),

  enrollCount: 0,
  addEnrollCount: (enrollCount: number) => set({ enrollCount }),

  bookmarkCount: 0,
  addBookmarkCount: (bookmarkCount: number) => set({ bookmarkCount }),

  viewCount: 0,
  addViewCount: (viewCount: number) => set({ viewCount }),

  hostUserCheck: false,
  addHostUserCheck: (hostUserCheck: boolean) => set({ hostUserCheck }),

  enrollmentNumber: null,
  addEnrollmentNumber: (enrollmentNumber: number | null) =>
    set({ enrollmentNumber }),

  commentLength: 0,
  addCommentLength: (commentLength: number) => set({ commentLength })
}))
