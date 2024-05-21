import type { ILoginDialogStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShow: false,
} as ILoginDialogStore

export const useLoginDialogStore = create<ILoginDialogStore>(set => ({
	...defaultStore,
	setShow(target) {
		set({ isShow: target })
	},
}))
