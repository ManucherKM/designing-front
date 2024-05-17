import axios from '@/config/axios'
import { create } from 'zustand'
import { IDesigningCoefficients, IDesigningStore } from './types'

export const useDesigningStore = create<IDesigningStore>()(set => ({
	coefficients: null,
	async getCurrent() {
		try {
			const { data } = await axios.get<IDesigningCoefficients>('designing')

			if (Object.keys(data).length === 0 || !data) {
				return
			}

			set(prev => ({ ...prev, coefficients: data }))

			return data
		} catch (e: any) {
			throw new Error(e)
		}
	},
}))
