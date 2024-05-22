import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useCalculateCostScaning, useFetchScaningCoefficients } from '@/hooks'
import { useResultDialogStore } from '@/storage'
import { useEffect, useState } from 'react'
import { TypographyH2 } from './typography-h2'
import { TypographyH3 } from './typography-h3'
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
import { toast } from './ui/use-toast'

export type TGeometryComplexity = 'Простая' | 'Средняя' | 'Сложная'

export type TSurface = 'Блестящая' | 'Матовая'

export type TScanningAccuracy = '0.1' | '0.063'

export interface IScanningFormData {
	length: string
	width: string
	height: string
	geometryComplexity: TGeometryComplexity
	surface: TSurface
	scanningAccuracy: TScanningAccuracy
}

const defaultForm: IScanningFormData = {
	length: '',
	width: '',
	height: '',
	geometryComplexity: 'Простая',
	surface: 'Блестящая',
	scanningAccuracy: '0.1',
}

export const Scanning = () => {
	useFetchScaningCoefficients()

	const savedData = useResultDialogStore(store => store.scanningData)

	const setShow = useResultDialogStore(store => store.setShow)

	const setScanning = useResultDialogStore(store => store.setScanning)

	const [form, setForm] = useState<IScanningFormData>(savedData || defaultForm)

	const cost = useCalculateCostScaning(form)

	function reset() {
		setForm(defaultForm)
	}

	useEffect(() => {
		setScanning(form)
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
								<Label htmlFor="length">Длина, мм</Label>
								<Input
									type="number"
									id="length"
									placeholder="142"
									value={form.length}
									onChange={e => {
										const value = e.target.value

										if (+value > 200) {
											setForm(prev => ({
												...prev,
												length: value,
												geometryComplexity: 'Сложная',
											}))

											toast({
												title: 'Сложность геометрии изменена',
												description:
													'Модель, размеры которой превышают 200 миллиметров имеет сложную геометрию.',
											})
											return
										}

										setForm(prev => ({ ...prev, length: value }))
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="width">Ширина, мм</Label>
								<Input
									type="number"
									id="width"
									placeholder="95"
									value={form.width}
									onChange={e => {
										const value = e.target.value

										if (+value > 200) {
											setForm(prev => ({
												...prev,
												width: value,
												geometryComplexity: 'Сложная',
											}))

											toast({
												title: 'Сложность геометрии изменена',
												description:
													'Модель, размеры которой превышают 200 миллиметров имеет сложную геометрию.',
											})
											return
										}

										setForm(prev => ({ ...prev, width: value }))
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="height">Высота, мм</Label>
								<Input
									type="number"
									id="height"
									placeholder="21"
									value={form.height}
									onChange={e => {
										const value = e.target.value

										if (+value > 200) {
											setForm(prev => ({
												...prev,
												height: value,
												geometryComplexity: 'Сложная',
											}))

											toast({
												title: 'Сложность геометрии изменена',
												description:
													'Модель, размеры которой превышают 200 миллиметров имеет сложную геометрию.',
											})
											return
										}

										setForm(prev => ({ ...prev, height: value }))
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
								<Label>Поверхность</Label>
								<Select
									defaultValue="Блестящая"
									value={form.surface}
									onValueChange={value => {
										setForm(prev => ({ ...prev, surface: value as TSurface }))
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Блестящая">Блестящая</SelectItem>
											<SelectItem value="Матовая">Матовая</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Точность сканирования</Label>
								<Select
									value={form.scanningAccuracy}
									onValueChange={value => {
										setForm(prev => ({
											...prev,
											scanningAccuracy: value as TScanningAccuracy,
										}))
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="0.1">0.1</SelectItem>
											<SelectItem value="0.063">0.063</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
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
