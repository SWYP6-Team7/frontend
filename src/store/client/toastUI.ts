import { create } from 'zustand'

interface IErrorToastUIStore {
  errorToastShow: boolean
  setErrorToastShow: (bool: boolean) => void
}

export const errorToastUI = create<IErrorToastUIStore>(set => ({
  errorToastShow: false,
  setErrorToastShow: bool => {
    set({ errorToastShow: bool })
  }
}))
