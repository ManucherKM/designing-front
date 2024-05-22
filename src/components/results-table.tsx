import {
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	Table as UITable,
} from '@/components/ui/table'
import { useCalculateCostModeling, useCalculateCostScaning } from '@/hooks'
import { useCalculateCostDesigning } from '@/hooks/useCalculateCostDesigning'
import { useResultDialogStore } from '@/storage'
import { getNumberWithSpaces, getNumberWithoutZeroes } from '@/utils'
import { useEffect, useState } from 'react'
import { IDesigningFormData } from './designing'
import { IModelingFormData } from './modeling'
import { IScanningFormData } from './scanning'

export const Table = () => {
	const [cost, setCost] = useState(0)

	const scanningData = useResultDialogStore(store => store.scanningData)
	const designingData = useResultDialogStore(store => store.designingData)
	const modelingData = useResultDialogStore(store => store.modelingData)

	const scanningCost = useCalculateCostScaning(
		scanningData || ({} as IScanningFormData),
	)
	const designingCost = useCalculateCostDesigning(
		designingData || ({} as IDesigningFormData),
	)
	const modelingCost = useCalculateCostModeling(
		modelingData || ({} as IModelingFormData),
	)

	const services = [
		{
			name: 'Сканирование',
			price: scanningCost || 0,
		},
		{
			name: '3D печать',
			price: designingCost || 0,
		},
		{
			name: 'Моделирование',
			price: modelingCost || 0,
		},
	]

	useEffect(() => {
		let cost = 0

		if (scanningCost) {
			cost += +scanningCost.split(' ').join('')
		}

		if (designingCost) {
			cost += +designingCost.split(' ').join('')
		}

		if (modelingCost) {
			cost += +modelingCost.split(' ').join('')
		}

		setCost(cost)
	}, [scanningCost, designingCost, modelingCost])
	return (
		<UITable>
			<TableCaption>
				Результаты подсчетов в данном калькуляторе носят информационный характер
				и ни при каких условиях{' '}
				<span className="underline"> не являются публичной офертой</span>,
				определяемой положениями Статьи 437(2) Гражданского кодекса РФ.
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Услуга</TableHead>
					<TableHead className="text-right">Стоимость</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{services.map(service => (
					<TableRow key={service.name}>
						<TableCell className="font-medium">{service.name}</TableCell>
						<TableCell className="text-right">{service.price}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={1}>Итого</TableCell>
					<TableCell className="text-right">
						{getNumberWithSpaces(getNumberWithoutZeroes(cost))}
					</TableCell>
				</TableRow>
			</TableFooter>
		</UITable>
	)
}
