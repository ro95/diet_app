import { create } from 'zustand'

type MenuState = {
  menus: string[]
  addMenu: (menu: string) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  addMenu: (menu) => set((state) => ({ menus: [...state.menus, menu] })),
}))