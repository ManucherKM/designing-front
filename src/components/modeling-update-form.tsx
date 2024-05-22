import { useUpdateModeling } from '@/hooks/useUpdateModeling'
import { useModelingStore } from '@/storage'
import { convertObjStrValsToNum } from '@/utils/convertObjStrValsToNum'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { TypographyH3 } from './typography-h3'
import { Button } from './ui/button'
import { Input } from './ui/input'

export interface IUpdateModeling {
	geometry_complexity: {
		easy: string
		normal: string
		hard: string
	}
	model_type: {
		artistic: string
		engineer: string
	}
	design_documentation: string
	visualization: string
	animation: string
}

export const ModelingUpdateForm = () => {
	const coefficients = useModelingStore(store => store.coefficients)

	const defaultForm: IUpdateModeling = {
		geometry_complexity: {
			easy: coefficients?.geometry_complexity.easy.toString() || '',
			normal: coefficients?.geometry_complexity.normal.toString() || '',
			hard: coefficients?.geometry_complexity.hard.toString() || '',
		},
		model_type: {
			artistic: coefficients?.model_type.artistic.toString() || '',
			engineer: coefficients?.model_type.engineer.toString() || '',
		},
		animation: coefficients?.animation.toString() || '',
		design_documentation: coefficients?.design_documentation.toString() || '',
		visualization: coefficients?.visualization.toString() || '',
	}

	const [form, setForm] = useState<IUpdateModeling>(defaultForm)

	const update = useUpdateModeling()

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
					<TypographyH3>Тип модели</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="model_type.artistic">Художественный</Label>
						<Input
							id="model_type.artistic"
							type="number"
							value={form.model_type?.artistic || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									model_type: {
										...prev.model_type,
										artistic: e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="model_type.engineer">Инженерный</Label>
						<Input
							id="model_type.engineer"
							type="number"
							value={form.model_type?.engineer || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									model_type: {
										...prev.model_type,
										engineer: e.target.value,
									},
								}))
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<TypographyH3>Дополнительные функции</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="design_documentation">
							Подготовка конструкторской документации
						</Label>
						<Input
							id="design_documentation"
							type="number"
							value={form.design_documentation || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									design_documentation: e.target.value,
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="visualization">Визуализация</Label>
						<Input
							id="visualization"
							type="number"
							value={form.visualization || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									visualization: e.target.value,
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="animation">Анимация</Label>
						<Input
							id="animation"
							type="number"
							value={form.animation || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									animation: e.target.value,
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
