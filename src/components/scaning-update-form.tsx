import { useUpdateScaning } from '@/hooks'
import { useScaningStore } from '@/storage'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { TypographyH3 } from './typography-h3'
import { Button } from './ui/button'
import { Input } from './ui/input'

export type TGeometryComplexity = 'Простая' | 'Средняя' | 'Сложная'

export type TSurface = 'Блестящая' | 'Матовая'

export type TScanningAccuracy = '0.1' | '0.063'

export interface IScanningFormData {
	geometry_complexity?: {
		easy?: number
		normal?: number
		hard?: number
	}
	surface?: {
		matte?: number
		brilliant?: number
	}
	scanning_accuracy?: {
		'0.1'?: number
		'0.063'?: number
	}
}

export const ScaningUpdateForm = () => {
	const coefficients = useScaningStore(store => store.coefficients)

	const defaultForm: IScanningFormData = {
		geometry_complexity: {
			easy: coefficients?.geometry_complexity.easy,
			normal: coefficients?.geometry_complexity.normal,
			hard: coefficients?.geometry_complexity.hard,
		},
		surface: {
			matte: coefficients?.surface.matte,
			brilliant: coefficients?.surface.brilliant,
		},
		scanning_accuracy: {
			'0.1': coefficients?.scanning_accuracy['0.1'],
			'0.063': coefficients?.scanning_accuracy['0.063'],
		},
	}

	const [form, setForm] = useState<IScanningFormData>(defaultForm)

	const update = useUpdateScaning()

	function updateHandler() {
		if (!coefficients?._id) {
			return
		}

		update(coefficients._id, form)
	}

	function reset() {
		setForm(defaultForm)
	}

	return (
		<div>
			<div className="grid grid-cols-2 gap-10">
				<div className="flex flex-col gap-5">
					<TypographyH3>Сложность геометрии</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="geometry_complexity.easy">Простая</Label>
						<Input
							id="geometry_complexity.easy"
							type="number"
							placeholder="10"
							value={form.geometry_complexity?.easy || ''}
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
					<div className="flex flex-col gap-2">
						<Label htmlFor="geometry_complexity.normal">Средняя</Label>
						<Input
							id="geometry_complexity.normal"
							type="number"
							placeholder="12.5"
							value={form.geometry_complexity?.normal || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									geometry_complexity: {
										...prev.geometry_complexity,
										normal: +e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="geometry_complexity.hard">Сложная</Label>
						<Input
							id="geometry_complexity.hard"
							type="number"
							placeholder="11"
							value={form.geometry_complexity?.hard || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									geometry_complexity: {
										...prev.geometry_complexity,
										hard: +e.target.value,
									},
								}))
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<TypographyH3>Поверхность</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="surface.matte">Матовая</Label>
						<Input
							id="surface.matte"
							type="number"
							placeholder="5"
							value={form.surface?.matte || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									surface: {
										...prev.surface,
										matte: +e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="surface.brilliant">Блестящая</Label>
						<Input
							id="surface.brilliant"
							type="number"
							placeholder="7"
							value={form.surface?.brilliant || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									surface: {
										...prev.surface,
										brilliant: +e.target.value,
									},
								}))
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<TypographyH3>Точность сканирования</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="scanning_accuracy?.['0.1']">0.1</Label>
						<Input
							id="scanning_accuracy?.['0.1']"
							type="number"
							placeholder="2"
							value={form.scanning_accuracy?.['0.1'] || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									scanning_accuracy: {
										...prev.scanning_accuracy,
										'0.1': +e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="scanning_accuracy?.['0.063']">0.063</Label>
						<Input
							id="scanning_accuracy?.['0.063']"
							type="number"
							placeholder="9"
							value={form.scanning_accuracy?.['0.063'] || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									scanning_accuracy: {
										...prev.scanning_accuracy,
										'0.063': +e.target.value,
									},
								}))
							}}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-start gap-4 mt-10">
				<Button variant={'outline'} onClick={reset}>
					Сбросить
				</Button>

				<Button onClick={updateHandler}>Сохранить</Button>
			</div>
		</div>
	)
}
