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
import { IDesigningFormData } from './designing'
import { IModelingFormData } from './modeling'
import { IScanningFormData } from './scanning'

export const Table = () => {
	const scanningData = useResultDialogStore(store => store.scanningData)
	const designingData = useResultDialogStore(store => store.designingData)
	const modelingData = useResultDialogStore(store => store.modelingData)

	const scanningCost =
		useCalculateCostScaning(scanningData || ({} as IScanningFormData)) || 0
	const designingCost =
		useCalculateCostDesigning(designingData || ({} as IDesigningFormData)) || 0
	const modelingCost =
		useCalculateCostModeling(modelingData || ({} as IModelingFormData)) || 0

	const services = [
		{
			name: 'Сканирование',
			price: scanningCost,
		},
		{
			name: '3D печать',
			price: designingCost,
		},
		{
			name: 'Моделирование',
			price: modelingCost,
		},
	]
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
					<TableCell className="text-right">
						{+scanningCost + +designingCost + +modelingCost}
					</TableCell>
				</TableRow>
			</TableFooter>
		</UITable>
	)
}
