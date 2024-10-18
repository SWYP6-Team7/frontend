// src/userStore.ts
import { create } from 'zustand'

type Gender = 'F' | 'M' | ''

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
  agegroup?: string
  addAgegroup: (agegroup: string) => void
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
  sex: '',
  addSex: sex => {
    set(state => ({ sex: sex }))
  },
  phoneNumber: '',
  addPhoneNumber: phoneNumber => {
    set(state => ({ phoneNumber: phoneNumber }))
  },
  agegroup: undefined,
  addAgegroup: age => {
    set(state => ({ agegroup: age }))
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
