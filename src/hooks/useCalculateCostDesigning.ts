import { IDesigningFormData } from '@/components/designing'
import { useDesigningStore } from '@/storage'
import { getNumberWithSpaces, getNumberWithoutZeroes } from '@/utils'
import { useEffect, useState } from 'react'

export const useCalculateCostDesigning = (data: IDesigningFormData) => {
	const coefficients = useDesigningStore(store => store.coefficients)

	const [cost, setCost] = useState<number>()

	useEffect(() => {
		if (coefficients === null) {
			return
		}

		if (!data.length.length || !data.height.length || !data.width.length) {
			return
		}

		setCost(0)
	}, [data, coefficients])

	if (!cost) return

	return getNumberWithSpaces(getNumberWithoutZeroes(cost))
}
