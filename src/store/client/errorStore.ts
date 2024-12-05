import { create } from 'zustand'

interface ErrorStore {
  error: null | Error
  updateError: (error: Error) => void
  isMutationError: boolean
  setIsMutationError: (isMutation: boolean) => void
}

export const errorStore = create<ErrorStore>(set => ({
  error: null,
  updateError: (error: Error) => {
    set({ error: error })
  },
  isMutationError: false,
  setIsMutationError: (value: boolean) => {
    set({ isMutationError: value })
  }
}))
