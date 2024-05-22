import { useUpdateDesigning } from '@/hooks/useUpdateDesigning'
import { useDesigningStore } from '@/storage'
import { convertObjStrValsToNum } from '@/utils/convertObjStrValsToNum'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { TypographyH3 } from './typography-h3'
import { Button } from './ui/button'
import { Input } from './ui/input'

export interface TUpdateDesigning {
	geometry_complexity: {
		easy: string
		normal: string
		hard: string
	}
	technology: {
		fdm: string
		photopolymer: string
	}
	assignment: {
		layout: string
		artistic: string
		technical: string
	}
	postprocessing: {
		easy: string
		normal: string
		hard: string
	}
}

export const DesigningUpdateForm = () => {
	const coefficients = useDesigningStore(store => store.coefficients)

	const defaultForm: TUpdateDesigning = {
		geometry_complexity: {
			easy: coefficients?.geometry_complexity.easy.toString() || '',
			normal: coefficients?.geometry_complexity.normal.toString() || '',
			hard: coefficients?.geometry_complexity.hard.toString() || '',
		},
		technology: {
			fdm: coefficients?.technology.fdm.toString() || '',
			photopolymer: coefficients?.technology.photopolymer.toString() || '',
		},
		assignment: {
			artistic: coefficients?.assignment?.artistic.toString() || '',
			layout: coefficients?.assignment?.layout.toString() || '',
			technical: coefficients?.assignment?.technical.toString() || '',
		},
		postprocessing: {
			easy: coefficients?.postprocessing.easy.toString() || '',
			hard: coefficients?.postprocessing.hard.toString() || '',
			normal: coefficients?.postprocessing.normal.toString() || '',
		},
	}

	const [form, setForm] = useState<TUpdateDesigning>(defaultForm)

	const update = useUpdateDesigning()

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
							placeholder="10"
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
							placeholder="12.5"
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
							placeholder="11"
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
					<TypographyH3>Технология</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="technology.fdm">FDM</Label>
						<Input
							id="technology.fdm"
							type="number"
							placeholder="1.5"
							value={form.technology?.fdm || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									technology: {
										...prev.technology,
										fdm: e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="technology.photopolymer">Фотополимер</Label>
						<Input
							id="technology.photopolymer"
							type="number"
							placeholder="0.5"
							value={form.technology?.photopolymer || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									technology: {
										...prev.technology,
										photopolymer: e.target.value,
									},
								}))
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<TypographyH3>Назначение</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="assignment.layout">Макет</Label>
						<Input
							id="assignment.layout"
							type="number"
							placeholder="2.5"
							value={form.assignment?.layout || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									assignment: {
										...prev.assignment,
										layout: e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="assignment.artistic">Художественное</Label>
						<Input
							id="assignment.artistic"
							type="number"
							placeholder="20"
							value={form.assignment?.artistic || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									assignment: {
										...prev.assignment,
										artistic: e.target.value,
									},
								}))
							}}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="assignment.technical">Техническое</Label>
						<Input
							id="assignment.technical"
							type="number"
							placeholder="41"
							value={form.assignment?.technical || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									assignment: {
										...prev.assignment,
										technical: e.target.value,
									},
								}))
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<TypographyH3>Постобработка</TypographyH3>
					<div className="flex flex-col gap-2">
						<Label htmlFor="postprocessing.easy">При простой геометрии</Label>
						<Input
							id="postprocessing.easy"
							type="number"
							placeholder="2.5"
							value={form.postprocessing?.easy || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									postprocessing: {
										...prev.postprocessing,
										easy: e.target.value,
									},
								}))
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="postprocessing.normal">При средней геометрии</Label>
						<Input
							id="postprocessing.normal"
							type="number"
							placeholder="20"
							value={form.postprocessing?.normal || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									postprocessing: {
										...prev.postprocessing,
										normal: e.target.value,
									},
								}))
							}}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="postprocessing.hard">При сложной геометрии</Label>
						<Input
							id="postprocessing.hard"
							type="number"
							placeholder="41"
							value={form.postprocessing?.hard || ''}
							onChange={e => {
								setForm(prev => ({
									...prev,
									postprocessing: {
										...prev.postprocessing,
										hard: e.target.value,
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
