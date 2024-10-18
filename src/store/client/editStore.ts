import { create } from 'zustand'

interface IEditStore {
  editToastShow: boolean
  setEditToastShow: (bool: boolean) => void
  reset: () => void
}

export const editStore = create<IEditStore>(set => ({
  editToastShow: false,
  setEditToastShow: bool => {
    set({ editToastShow: bool })
  },
  reset: () => {
    set({ editToastShow: false })
  }
}))
