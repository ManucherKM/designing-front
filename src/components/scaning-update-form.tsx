import { useUpdateScaning } from '@/hooks'
import { useScaningStore } from '@/storage'
import { convertObjStrValsToNum } from '@/utils/convertObjStrValsToNum'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { TypographyH3 } from './typography-h3'
import { Button } from './ui/button'
import { Input } from './ui/input'

export interface TUpdateScaning {
	geometry_complexity: {
		easy: string
		normal: string
		hard: string
	}
	surface: {
		matte: string
		brilliant: string
	}
	scanning_accuracy: {
		'0.1': string
		'0.063': string
	}
}

export const ScaningUpdateForm = () => {
	const coefficients = useScaningStore(store => store.coefficients)

	const defaultForm: TUpdateScaning = {
		geometry_complexity: {
			easy: coefficients?.geometry_complexity.easy.toString() || '',
			normal: coefficients?.geometry_complexity.normal.toString() || '',
			hard: coefficients?.geometry_complexity.hard.toString() || '',
		},
		surface: {
			matte: coefficients?.surface.matte.toString() || '',
			brilliant: coefficients?.surface.brilliant.toString() || '',
		},
		scanning_accuracy: {
			'0.1': coefficients?.scanning_accuracy['0.1'].toString() || '',
			'0.063': coefficients?.scanning_accuracy['0.063'].toString() || '',
		},
	}

	const [form, setForm] = useState<TUpdateScaning>(defaultForm)

	const update = useUpdateScaning()

	function updateHandler() {
		if (!coefficients?._id) {
			return
		}

		update(coefficients._id, convertObjStrValsToNum(form))
	}

	function reset() {
		setForm(defaultForm)
	}

	return (
		<div className="pb-5">
			<div className="grid grid-cols-2 gap-10 ph_lg:grid-cols-1">
				<div className="flex flex-col gap-5">
					<TypographyH3>Сложность геометрии</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="geometry_complexity.easy">Простая</Label>
						<Input
							id="geometry_complexity.easy"
							type="number"
							value={form.geometry_complexity?.easy || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									geometry_complexity: {
										...prev.geometry_complexity,
										easy: e.target.value,
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
							value={form.geometry_complexity?.normal || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									geometry_complexity: {
										...prev.geometry_complexity,
										normal: e.target.value,
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
							value={form.geometry_complexity?.hard || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									geometry_complexity: {
										...prev.geometry_complexity,
										hard: e.target.value,
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
							value={form.surface?.matte || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									surface: {
										...prev.surface,
										matte: e.target.value,
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
							value={form.surface?.brilliant || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									surface: {
										...prev.surface,
										brilliant: e.target.value,
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
							value={form.scanning_accuracy?.['0.1'] || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									scanning_accuracy: {
										...prev.scanning_accuracy,
										'0.1': e.target.value,
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
							value={form.scanning_accuracy?.['0.063'] || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									scanning_accuracy: {
										...prev.scanning_accuracy,
										'0.063': e.target.value,
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
