import { create } from 'zustand'

interface IEditStore {
  editToastShow: boolean
  setEditToastShow: (bool: boolean) => void
  reset: () => void
  removeToastShow: boolean
  setRemoveToastShow: (bool: boolean) => void
}

export const editStore = create<IEditStore>(set => ({
  editToastShow: false,
  setEditToastShow: bool => {
    set({ editToastShow: bool })
  },
  removeToastShow: false,
  setRemoveToastShow: bool => {
    set({ removeToastShow: bool })
  },
  reset: () => {
    set({ editToastShow: false, removeToastShow: false })
  }
}))
