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

  agegroup?: string
  addAgegroup: (agegroup: string) => void
  resetForm: () => void
  resetGender: () => void
  resetAge: () => void
  resetName: () => void
  reset: () => void
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
  agegroup: undefined,
  addAgegroup: age => {
    set(state => ({ agegroup: age }))
  },
  email: '',
  addEmail: email => {
    set(state => ({ email: email }))
  },
  password: '',
  addPassword: password => {
    set(state => ({ password: password }))
  },
  resetAge: () => {
    set({ agegroup: undefined })
  },
  resetForm: () => {
    set({ email: '', password: '' })
  },
  resetName: () => {
    set({ name: '' })
  },
  resetGender: () => {
    set({ sex: '' })
  },
  reset: () => {
    set({ sex: '', name: '', email: '', password: '', agegroup: undefined })
  }
}))
