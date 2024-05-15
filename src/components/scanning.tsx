import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TypographyH2 } from './typographyH2'
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

export const Scanning = () => {
	return (
		<Card className="w-full">
			<CardHeader></CardHeader>
			<CardContent>
				<div className="grid w-full grid-cols-3 gap-5">
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
											<SelectItem value="difficult">Сложная</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Поверхность</Label>
								<Select defaultValue="shiny">
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="shiny">Блестящая</SelectItem>
											<SelectItem value="matte">Матовая</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Точность сканирования</Label>
								<Select defaultValue="normal">
									<SelectTrigger>
										<SelectValue placeholder="Выберите значение" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="normal">0.1</SelectItem>
											<SelectItem value="greater">0.063</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-center">Стоимость</span>
						<div className="h-full flex justify-center items-center">
							<TypographyH2 className="text-center border-none">
								13 800,05 ₽
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
