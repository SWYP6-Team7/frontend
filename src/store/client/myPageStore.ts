// src/userStore.ts
import { create } from 'zustand'

interface myPageStoreState {
  email: string
  addEmail: (email: string) => void
  name: string
  addName: (name: string) => void
  gender: string
  addGender: (sex: string) => void
  agegroup: string
  addAgegroup: (agegroup: string) => void
  proIntroduce?: string
  addProIntroduce?: (proIntroduce: string) => void
  preferredTags: string[]
  addPreferredTags: (preferredTags: string[]) => void
  isNameUpdated: boolean
  addIsNameUpdated: (isNameUpdated: boolean) => void
}

export const myPageStore = create<myPageStoreState>(set => ({
  name: '',
  addName: name => {
    set(state => ({ name: name }))
  },
  gender: '',
  addGender: gender => {
    set(state => ({ gender }))
  },
  agegroup: '',
  addAgegroup: agegroup => {
    set(state => ({ agegroup }))
  },
  preferredTags: [],
  addPreferredTags: preferredTags => {
    set(state => ({ preferredTags }))
  },
  email: '',
  addEmail: email => {
    set(state => ({ email: email }))
  },
  proIntroduce: '',
  addProIntroduce: proIntroduce => {
    set(state => ({ proIntroduce }))
  },
  isNameUpdated: false,
  addIsNameUpdated: isNameUpdated => {
    set(state => ({ isNameUpdated }))
  }
}))
