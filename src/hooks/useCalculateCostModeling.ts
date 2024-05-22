import { IModelingFormData } from '@/components/modeling'
import { useModelingStore } from '@/storage'
import { getNumberWithSpaces, getNumberWithoutZeroes } from '@/utils'
import { useEffect, useState } from 'react'

export const useCalculateCostModeling = (data: IModelingFormData) => {
	const coefficients = useModelingStore(store => store.coefficients)

	const [cost, setCost] = useState<number>()

	useEffect(() => {
		if (coefficients === null) {
			return
		}

		if (!data.changed) {
			setCost(undefined)

			return
		}

		// Итоговая стоимость
		let totalCost = 0

		// Коэфицент сложности геометрии
		if (data.geometryComplexity === 'Простая') {
			totalCost += coefficients.geometry_complexity.easy
		} else if (data.geometryComplexity === 'Средняя') {
			totalCost += coefficients.geometry_complexity.normal
		} else {
			totalCost += coefficients.geometry_complexity.hard
		}

		// Коэфицент типа модели
		if (data.modelType === 'Художественный') {
			totalCost += coefficients.model_type.artistic
		} else {
			totalCost += coefficients.model_type.engineer
		}

		// Коэфицент подготовки документации
		if (data.docs) {
			totalCost += coefficients.design_documentation
		}

		// Коэфицент анимации
		if (data.animation) {
			totalCost += coefficients.animation
		}

		// Коэфицент визуализации
		if (data.visualization) {
			totalCost += coefficients.visualization
		}

		setCost(totalCost)
	}, [data, coefficients])

	if (!cost) return

	return getNumberWithSpaces(getNumberWithoutZeroes(cost))
}
