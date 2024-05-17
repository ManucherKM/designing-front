import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useFetchDesigningCoefficients } from '@/hooks/'
import { TypographyH2 } from './typography-h2'
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

export const Designing = () => {
	const coefficients = useFetchDesigningCoefficients()

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
								<Input type="text" id="length" placeholder="142" />
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="width">Ширина, мм</Label>
								<Input type="text" id="width" placeholder="95" />
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="height">Высота, мм</Label>
								<Input type="text" id="height" placeholder="21" />
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-center">Дополнительно</span>

						<div className="flex flex-col gap-5 mt-5">
							<div className="flex flex-col gap-2">
								<Label>Сложность геометрии</Label>
								<Select defaultValue="easy">
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="easy">Простая</SelectItem>
											<SelectItem value="normal">Средняя</SelectItem>
											<SelectItem value="difficult">Сложная</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="w-full grid grid-cols-2 gap-2">
								<div className="flex flex-col gap-2">
									<Label>Технология</Label>
									<Select defaultValue="fdm">
										<SelectTrigger>
											<SelectValue placeholder="Выберите значение" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="fdm">FDM</SelectItem>
												<SelectItem value="photopolymer">
													Фотополимер
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className="flex flex-col gap-2">
									<Label>Назначение</Label>
									<Select defaultValue="layout">
										<SelectTrigger>
											<SelectValue placeholder="Выберите значение" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="layout">Макет</SelectItem>
												<SelectItem value="artistic">Художественное</SelectItem>
												<SelectItem value="technical">Техническое</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Ещё</Label>
								<div className="flex h-9">
									<div className="flex gap-2 items-center">
										<Checkbox id="post-processing" />
										<Label htmlFor="post-processing">Постобработка</Label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-center">Стоимость</span>
						<div className="h-full flex justify-center items-center">
							<TypographyH2 className="text-center border-none">
								9 300 ₽
							</TypographyH2>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Сбросить</Button>
				<div className="flex gap-2">
					<Button variant="secondary">Добавить</Button>
					<Button>Расчитать</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
