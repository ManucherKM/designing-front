import { persist } from 'zustand/middleware'
import type { IResultDialogStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShow: false,
	designingData: null,
	scanningDatam: null,
	modelingData: null,
} as unknown as IResultDialogStore

export const useResultDialogStore = create(
	persist<IResultDialogStore>(
		set => ({
			...defaultStore,
			setDesigning(target) {
				set({ designingData: target })
			},
			setModeling(target) {
				set({ modelingData: target })
			},
			setScanning(target) {
				set({ scanningData: target })
			},
			setShow(target) {
				set({ isShow: target })
			},
		}),
		{ name: 'result-store' },
	),
)
