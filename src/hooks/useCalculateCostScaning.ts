import { IScanningFormData } from '@/components/scanning'
import { useScaningStore } from '@/storage'
import { getNumberWithSpaces, getNumberWithoutZeroes } from '@/utils'
import { useEffect, useState } from 'react'

export const useCalculateCostScaning = (data: IScanningFormData) => {
	const coefficients = useScaningStore(store => store.coefficients)

	const [cost, setCost] = useState<number>()

	useEffect(() => {
		if (coefficients === null) {
			return
		}

		if (!data.length.length || !data.height.length || !data.width.length) {
			return
		}

		const volume = +data.length * +data.width * +data.height

		let complexityFactor: number

		if (data.geometryComplexity === 'Простая') {
			complexityFactor = coefficients.geometry_complexity.easy
		} else if (data.geometryComplexity === 'Средняя') {
			complexityFactor = coefficients.geometry_complexity.normal
		} else {
			complexityFactor = coefficients.geometry_complexity.hard
		}

		let surfaceCoefficient: number

		if (data.surface === 'Блестящая') {
			surfaceCoefficient = coefficients.surface.brilliant
		} else {
			surfaceCoefficient = coefficients.surface.matte
		}

		let accuracyCoefficient: number

		if (data.scanningAccuracy === '0.1') {
			accuracyCoefficient = coefficients.scanning_accuracy['0.1']
		} else {
			accuracyCoefficient = coefficients.scanning_accuracy['0.063']
		}

		setCost(
			volume * complexityFactor * surfaceCoefficient * accuracyCoefficient,
		)
	}, [data, coefficients])

	if (!cost) return

	return getNumberWithSpaces(getNumberWithoutZeroes(cost))
}
