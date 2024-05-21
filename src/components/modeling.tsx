import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TypographyH2 } from './typography-h2'
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

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useFetchModelingCoefficients } from '@/hooks'
import { Checkbox } from './ui/checkbox'

export const Modeling = () => {
	const coefficients = useFetchModelingCoefficients()

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
							<div className="flex flex-col gap-2">
								<Label>Тип модели</Label>
								<Select defaultValue="artistic">
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="artistic">Художественный</SelectItem>
											<SelectItem value="engineering">Инженерный</SelectItem>
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
									<PopoverContent className="w-120">
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
													<Checkbox id="docs" />
													<Label htmlFor="docs">
														Подготовка конструкторской документации
													</Label>
												</div>
												<div className="flex gap-2 items-center">
													<Checkbox id="visualization" />
													<Label htmlFor="visualization">Визуализация</Label>
												</div>
												<div className="flex gap-2 items-center">
													<Checkbox id="animation" />
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
							<TypographyH2 className="text-center border-none">
								12 500,08 ₽
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
