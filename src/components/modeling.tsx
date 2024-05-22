import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TypographyH2 } from './typography-h2'
import { Label } from './ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useCalculateCostModeling, useFetchModelingCoefficients } from '@/hooks'
import { useResultDialogStore } from '@/storage'
import { compareObj } from '@/utils'
import { useEffect, useState } from 'react'
import { TypographyH3 } from './typography-h3'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'

export type TGeometryComplexity = 'Простая' | 'Средняя' | 'Сложная'

export type TModelType = 'Художественный' | 'Инженерный'

export interface IModelingFormData {
	length: string
	width: string
	height: string
	geometryComplexity: TGeometryComplexity
	modelType: TModelType
	animation: boolean
	docs: boolean
	visualization: boolean
	changed: boolean
}

const defaultForm: IModelingFormData = {
	length: '',
	width: '',
	height: '',
	geometryComplexity: 'Простая',
	modelType: 'Художественный',
	animation: false,
	docs: false,
	visualization: false,
	changed: false,
}

// Максимальные размеры модельки в миллиметрах
const maxSizes = {
	length: 200,
	width: 200,
	height: 200,
}

export const Modeling = () => {
	useFetchModelingCoefficients()

	const setShow = useResultDialogStore(store => store.setShow)

	const setModeling = useResultDialogStore(store => store.setModeling)

	const [form, setForm] = useState<IModelingFormData>(defaultForm)

	const cost = useCalculateCostModeling(form)

	function reset() {
		setForm(defaultForm)
	}

	useEffect(() => {
		const isEquals = compareObj(form, defaultForm)

		if (!isEquals && !form.changed) {
			setForm(prev => ({ ...prev, changed: true }))
		}
	}, [form])

	useEffect(() => {
		setModeling(form)
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
							<div className="flex flex-col gap-2">
								<Label>Тип модели</Label>
								<Select
									value={form.modelType}
									onValueChange={value => {
										setForm(prev => ({
											...prev,
											modelType: value as TModelType,
										}))
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Художественный">
												Художественный
											</SelectItem>
											<SelectItem value="Инженерный">Инженерный</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Popover>
									<PopoverTrigger asChild>
										<div className="flex flex-col gap-2">
											<Label>Ещё</Label>
											<Button variant="outline">Нажмите чтобы раскрыть</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent className="w-96">
										<div className="grid gap-4">
											<div className="space-y-2">
												<h4 className="font-medium leading-none">
													Дополнительные функции
												</h4>
												<p className="text-sm text-muted-foreground">
													Выберите необходимые работы
												</p>
											</div>
											<div className="flex flex-col gap-5">
												<div className="flex gap-2 items-center">
													<Checkbox
														id="docs"
														checked={form.docs}
														onCheckedChange={value => {
															setForm(prev => ({
																...prev,
																docs: value as boolean,
															}))
														}}
													/>
													<Label htmlFor="docs">
														Подготовка конструкторской документации
													</Label>
												</div>
												<div className="flex gap-2 items-center">
													<Checkbox
														id="visualization"
														checked={form.visualization}
														onCheckedChange={value => {
															setForm(prev => ({
																...prev,
																visualization: value as boolean,
															}))
														}}
													/>
													<Label htmlFor="visualization">Визуализация</Label>
												</div>
												<div className="flex gap-2 items-center">
													<Checkbox
														id="animation"
														checked={form.animation}
														onCheckedChange={value => {
															setForm(prev => ({
																...prev,
																animation: value as boolean,
															}))
														}}
													/>
													<Label htmlFor="animation">Анимация</Label>
												</div>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
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
