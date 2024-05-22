import axios from '@/config/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IModelingCoefficients, IModelingStore } from './types'

export const useModelingStore = create(
	persist<IModelingStore>(
		set => ({
			coefficients: null,
			async getCurrent() {
				try {
					const { data } = await axios.get<IModelingCoefficients>('modeling')

					if (Object.keys(data).length === 0 || !data) {
						return
					}

					set(prev => ({ ...prev, coefficients: data }))

					return data
				} catch (e: any) {
					throw new Error(e)
				}
			},
		}),
		{ name: 'modeling-store' },
	),
)
