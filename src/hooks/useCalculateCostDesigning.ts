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
			setCost(undefined)
			return
		}

		// Объем
		const volume = +data.width * +data.height * +data.length

		// Масса в граммах
		const m = volume * 0.00125 // <- 0.00125 - это плотность материала в мм

		// Стоимость самого материала
		const materialCost = m * 5 // <- 5 - это стоимость 1 грамма материла

		// Итоговая стоимость
		let totalCost = materialCost

		// Коэфицент сложности геометрии
		if (data.geometryComplexity === 'Простая') {
			totalCost += coefficients.geometry_complexity.easy
		} else if (data.geometryComplexity === 'Средняя') {
			totalCost += coefficients.geometry_complexity.normal
		} else {
			totalCost += coefficients.geometry_complexity.hard
		}

		// Коэфицент выбранной технологии
		if (data.technology === 'FDM') {
			totalCost += coefficients.technology.fdm
		} else {
			totalCost += coefficients.technology.photopolymer
		}

		// Коэфицент выбранного назначения
		if (data.assignment === 'Техническое') {
			totalCost *= coefficients.assignment.technical
		} else if (data.assignment === 'Художественное') {
			totalCost *= coefficients.assignment.artistic
		} else {
			totalCost *= coefficients.assignment.layout
		}

		// Коэфицент постобработки
		if (data.postprocessing) {
			if (data.geometryComplexity === 'Простая') {
				totalCost += coefficients.postprocessing.easy
			} else if (data.geometryComplexity === 'Средняя') {
				totalCost += coefficients.postprocessing.normal
			} else {
				totalCost += coefficients.postprocessing.hard
			}
		}

		setCost(totalCost)
	}, [data, coefficients])

	if (!cost) return

	return getNumberWithSpaces(getNumberWithoutZeroes(cost))
}
