import axios from '@/config/axios'
import { create } from 'zustand'
import { IScaningStore, IScanningCoefficients } from './types'

export const useScaningStore = create<IScaningStore>()(() => ({
	async getCurrent() {
		try {
			const { data } = await axios.get<IScanningCoefficients>('scaning')

			if (Object.keys(data).length === 0 || !data) {
				return
			}

			return data
		} catch (e: any) {
			throw new Error(e)
		}
	},
}))
