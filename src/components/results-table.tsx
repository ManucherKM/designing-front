import {
	TableBody,
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
			cost += +scanningCost
		}

		if (designingCost) {
			cost += +designingCost
		}

		if (modelingCost) {
			cost += +modelingCost
		}

		setCost(cost)
	}, [scanningCost, designingCost, modelingCost])
	return (
		<UITable>
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
					<TableCell className="text-right">{cost}</TableCell>
				</TableRow>
			</TableFooter>
		</UITable>
	)
}
