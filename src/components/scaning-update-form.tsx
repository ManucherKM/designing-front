import { useScaningStore } from '@/storage'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { Input } from './ui/input'

export type TGeometryComplexity = 'Простая' | 'Средняя' | 'Сложная'

export type TSurface = 'Блестящая' | 'Матовая'

export type TScanningAccuracy = '0.1' | '0.063'

export interface IScanningFormData {
	geometry_complexity: {
		easy: number
		normal: number
		hard: number
	}
	surface: {
		matte: number
		brilliant: number
	}
	scanning_accuracy: {
		'0.1': number
		'0.063': number
	}
}

export const ScaningUpdateForm = () => {
	const coefficients = useScaningStore(store => store.coefficients)

	const defaultForm: IScanningFormData = {
		geometry_complexity: {
			easy: coefficients?.geometry_complexity.easy || 0,
			normal: coefficients?.geometry_complexity.normal || 0,
			hard: coefficients?.geometry_complexity.hard || 0,
		},
		surface: {
			matte: coefficients?.surface.matte || 0,
			brilliant: coefficients?.surface.brilliant || 0,
		},
		scanning_accuracy: {
			'0.1': coefficients?.scanning_accuracy['0.1'] || 0,
			'0.063': coefficients?.scanning_accuracy['0.063'] || 0,
		},
	}

	const [form, setForm] = useState<IScanningFormData>(defaultForm)

	return (
		<div className="grid grid-cols-2">
			<div className="flex flex-col gap-2">
				<Label>Сложность геометрии</Label>
				<Label htmlFor="geometry_complexity.easy">Простая</Label>
				<Input
					id="geometry_complexity.easy"
					type="number"
					placeholder="142"
					value={form.geometry_complexity.easy}
					onChange={e => {
						setForm(prev => ({
							...prev,
							geometry_complexity: {
								...prev.geometry_complexity,
								easy: +e.target.value,
							},
						}))
					}}
				/>
			</div>
		</div>
	)
}
