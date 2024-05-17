import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogProps } from '@radix-ui/react-dialog'
import { FC, ReactNode } from 'react'

export interface IAdminDialog {
	children: ReactNode
	onOpenChange: DialogProps['onOpenChange']
	open: DialogProps['open']
}

export const AdminDialog: FC<IAdminDialog> = ({
	children,
	onOpenChange,
	open,
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] rounded-lg">
				<DialogHeader>
					<DialogTitle className="text-left">Вход в админку</DialogTitle>
					<DialogDescription className="text-justify !mt-3">
						Данный раздел разработан исключительно для администраторов сервиса.
						Если вы им не являетесь, настоятельно просим покинуть данный раздел.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="login">Логин</Label>
						<Input id="login" className="col-span-3" placeholder="Ваш логин" />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="password">Пароль</Label>
						<Input
							id="password"
							placeholder="Ваш пароль"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Войти</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
