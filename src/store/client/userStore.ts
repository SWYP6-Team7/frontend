// src/userStore.ts
import { create } from 'zustand'

type Gender = 'F' | 'M' | ''

interface userState {
  socialLogin: null | 'kakao' | 'naver' | 'google'
  setSocialLogin: (
    social: null | 'kakao' | 'naver' | 'google',
    userNumber: number | null
  ) => void
  email: string
  addEmail: (email: string) => void
  password: string
  addPassword: (password: string) => void
  name: string
  addName: (name: string) => void
  sex: Gender
  addSex: (sex: Gender) => void
  userNumber: number | null
  agegroup?: string
  addAgegroup: (agegroup: string) => void
  resetForm: () => void
  resetGender: () => void
  resetAge: () => void
  resetName: () => void
  reset: () => void
  tempName: string | null
  setTempName: (tempName: string) => void
}

export const userStore = create<userState>(set => ({
  socialLogin: null,
  userNumber: null,
  setSocialLogin: (social, userNumber) => {
    set({ socialLogin: social, userNumber })
  },
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
  tempName: null,
  setTempName: tempName => {
    set({ tempName })
  },
  reset: () => {
    set({
      sex: '',
      name: '',
      email: '',
      password: '',
      agegroup: undefined,
      tempName: null
    })
  }
}))
