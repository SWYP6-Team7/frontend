// src/userStore.ts
import { create } from 'zustand'

type Gender = '여자' | '남자' | null

interface userState {
  email: string
  addEmail: (email: string) => void
  password: string
  addPassword: (password: string) => void
  name: string
  addName: (name: string) => void
  sex: Gender
  addSex: (sex: Gender) => void
  phoneNumber: string
  addPhoneNumber: (phoneNumber: string) => void
  yearOfBirth: number
  addYearOfBirth: (yearOfBirth: number) => void
  tripStyle: string[]
  addTripStyle: (tripStyle: string) => void
  tripTheme: string[]
  addTripTheme: (tripTheme: string) => void
}

export const userStore = create<userState>(set => ({
  name: '',
  addName: name => {
    set(state => ({ name: name }))
  },
  sex: null,
  addSex: sex => {
    set(state => ({ sex: sex }))
  },
  phoneNumber: '',
  addPhoneNumber: phoneNumber => {
    set(state => ({ phoneNumber: phoneNumber }))
  },
  yearOfBirth: 2000,
  addYearOfBirth: year => {
    set(state => ({ yearOfBirth: year }))
  },
  tripStyle: [],
  addTripStyle: style => {
    set(state => ({ tripStyle: [...state.tripStyle, style] }))
  },
  tripTheme: [],
  addTripTheme: theme => {
    set(state => ({ tripTheme: [...state.tripTheme, theme] }))
  },
  email: '',
  addEmail: email => {
    set(state => ({ email: email }))
  },
  password: '',
  addPassword: password => {
    set(state => ({ password: password }))
  }
}))
