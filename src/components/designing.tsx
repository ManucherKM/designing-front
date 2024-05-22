import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useFetchDesigningCoefficients } from '@/hooks/'
import { useCalculateCostDesigning } from '@/hooks/useCalculateCostDesigning'
import { useResultDialogStore } from '@/storage'
import { useEffect, useState } from 'react'
import { TypographyH2 } from './typography-h2'
import { TypographyH3 } from './typography-h3'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export type TGeometryComplexity = 'Простая' | 'Средняя' | 'Сложная'

export type TTechnology = 'FDM' | 'Фотополимер'

export type TAssignment = 'Макет' | 'Художественное' | 'Техническое'

export interface IDesigningFormData {
	length: string
	width: string
	height: string
	geometryComplexity: TGeometryComplexity
	technology: TTechnology
	assignment: TAssignment
	postprocessing: boolean
}

const defaultForm: IDesigningFormData = {
	length: '',
	width: '',
	height: '',
	geometryComplexity: 'Простая',
	assignment: 'Макет',
	technology: 'FDM',
	postprocessing: false,
}

// Максимальные размеры модельки в миллиметрах
const maxSizes = {
	length: 200,
	width: 200,
	height: 200,
}

export const Designing = () => {
	useFetchDesigningCoefficients()

	const savedData = useResultDialogStore(store => store.designingData)

	const setShow = useResultDialogStore(store => store.setShow)

	const setDesigning = useResultDialogStore(store => store.setDesigning)

	const [form, setForm] = useState<IDesigningFormData>(savedData || defaultForm)

	const cost = useCalculateCostDesigning(form)

	function reset() {
		setForm(defaultForm)
	}

	useEffect(() => {
		setDesigning(form)
	}, [form])
	return (
		<Card className="w-full">
			<CardHeader></CardHeader>
			<CardContent>
				<div className="grid w-full grid-cols-3 gap-5 ph_lg:grid-cols-none">
					<div className="flex flex-col">
						<span className="text-center">Размеры детали</span>
						<div className="flex flex-col gap-5 mt-5">
							<div className="flex flex-col gap-2">
								<Label htmlFor="length">Длина, мм (макс. 200)</Label>
								<Input
									type="number"
									id="length"
									placeholder="142"
									value={form.length}
									onChange={e => {
										const value = e.target.value

										if (+value <= maxSizes.length) {
											setForm(prev => ({ ...prev, length: value }))
										}
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="width">Ширина, мм (макс. 200)</Label>
								<Input
									type="number"
									id="width"
									placeholder="95"
									value={form.width}
									onChange={e => {
										const value = e.target.value

										if (+value <= maxSizes.width) {
											setForm(prev => ({ ...prev, width: value }))
										}
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="height">Высота, мм (макс. 200)</Label>
								<Input
									type="number"
									id="height"
									placeholder="21"
									value={form.height}
									onChange={e => {
										const value = e.target.value

										if (+value <= maxSizes.height) {
											setForm(prev => ({ ...prev, height: value }))
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-center">Дополнительно</span>

						<div className="flex flex-col gap-5 mt-5">
							<div className="flex flex-col gap-2">
								<Label>Сложность геометрии</Label>
								<Select
									value={form.geometryComplexity}
									onValueChange={value => {
										setForm(prev => ({
											...prev,
											geometryComplexity: value as TGeometryComplexity,
										}))
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Простая">Простая</SelectItem>
											<SelectItem value="Средняя">Средняя</SelectItem>
											<SelectItem value="Сложная">Сложная</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="w-full grid grid-cols-2 gap-2">
								<div className="flex flex-col gap-2">
									<Label>Технология</Label>
									<Select
										value={form.technology}
										defaultValue={form.technology}
										onValueChange={value => {
											setForm(prev => ({
												...prev,
												technology: value as TTechnology,
											}))
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Выберите значение" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="FDM">FDM</SelectItem>
												<SelectItem value="Фотополимер">Фотополимер</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className="flex flex-col gap-2">
									<Label>Назначение</Label>
									<Select
										value={form.assignment}
										defaultValue={form.assignment}
										onValueChange={value => {
											setForm(prev => ({
												...prev,
												assignment: value as TAssignment,
											}))
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Выберите значение" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="Макет">Макет</SelectItem>
												<SelectItem value="Художественное">
													Художественное
												</SelectItem>
												<SelectItem value="Техническое">Техническое</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Ещё</Label>
								<div className="flex h-9">
									<div className="flex gap-2 items-center">
										<Checkbox
											id="post-processing"
											checked={form.postprocessing}
											onCheckedChange={value => {
												setForm(prev => ({
													...prev,
													postprocessing: value as boolean,
												}))
											}}
										/>
										<Label htmlFor="post-processing">Постобработка</Label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col ph_lg:h-40">
						<span className="text-center">Стоимость</span>
						<div className="h-full flex justify-center items-center">
							{cost === undefined ? (
								<TypographyH3 className="text-center border-none">
									Введите данные для расчета стоимости
								</TypographyH3>
							) : (
								<TypographyH2 className="text-center border-none">
									{cost} ₽
								</TypographyH2>
							)}
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={reset}>
					Сбросить
				</Button>
				<div className="flex gap-2">
					<Button onClick={() => setShow(true)}>Расчитать</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
