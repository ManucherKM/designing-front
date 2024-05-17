import axios from '@/config/axios'
import { create } from 'zustand'
import { IModelingCoefficients, IModelingStore } from './types'

export const useModelingStore = create<IModelingStore>()(() => ({
	async getCurrent() {
		try {
			const { data } = await axios.get<IModelingCoefficients>('modeling')

			if (Object.keys(data).length === 0 || !data) {
				return
			}

			return data
		} catch (e: any) {
			throw new Error(e)
		}
	},
}))
