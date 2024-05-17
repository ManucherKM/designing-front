import axios from '@/config/axios'
import { create } from 'zustand'
import { IDesigningCoefficients, IDesigningStore } from './types'

export const useDesigningStore = create<IDesigningStore>()(() => ({
	async getCurrent() {
		try {
			const { data } = await axios.get<IDesigningCoefficients>('designing')

			if (Object.keys(data).length === 0 || !data) {
				return
			}

			return data
		} catch (e: any) {
			throw new Error(e)
		}
	},
}))
