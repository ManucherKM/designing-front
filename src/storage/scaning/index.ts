import axios from '@/config/axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IScaningStore, IScanningCoefficients } from './types'

export const useScaningStore = create(
	persist<IScaningStore>(
		set => ({
			coefficients: null,
			async getCurrent() {
				try {
					const { data } = await axios.get<IScanningCoefficients>('scaning')

					if (Object.keys(data).length === 0 || !data) {
						return
					}

					set(prev => ({ ...prev, coefficients: data }))

					return data
				} catch (e: any) {
					throw new Error(e)
				}
			},
			async update(id: string, target) {
				try {
					const { data } = await axios.patch<IScanningCoefficients>(
						`scaning/${id}`,
						target,
					)

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
		{
			name: 'scaning-store',
		},
	),
)
