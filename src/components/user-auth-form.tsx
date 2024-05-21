import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoader } from '@/hooks'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/storage'
import { HTMLAttributes, useRef, useState } from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const passwordLabelRef = useRef<HTMLLabelElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)

	const login = useAuthStore(store => store.login)

	const loader = useLoader()

	const { toast } = useToast()

	const userAuthSchema = z.z.object({
		email: z.string().email({
			message: 'Введите корректную почту',
		}),
		password: z.string().min(8, {
			message: 'Введите корректный пароль',
		}),
	})

	type FormData = z.infer<typeof userAuthSchema>

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userAuthSchema),
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(data: FormData) {
		setIsLoading(true)

		const isSuccess = await loader(login, {
			email: data.email,
			password: data.password,
		})

		if (!isSuccess) {
			toast({
				title: 'Не удалось авторизоваться',
				description: 'Возможно вы указали неверный логин или пароль',
			})

			return
		}

		toast({
			title: 'Авторизация прошла успешно',
			description: 'Функционал администратора разблокирован',
		})
	}

	return (
		<div className={cn(className)} {...props}>
			<form className="w-full flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Почта</Label>
					<Input
						id="email"
						placeholder="Ваша почта"
						type="email"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						disabled={isLoading}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								passwordLabelRef.current?.click()
							}
						}}
						{...register('email')}
					/>
					{errors?.email && (
						<p className="px-1 text-xs text-red-600">{errors.email.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<Label ref={passwordLabelRef} htmlFor="password">
						Пароль
					</Label>
					<Input
						id="password"
						placeholder="Ваш пароль"
						type="password"
						autoCapitalize="none"
						autoComplete="password"
						autoCorrect="off"
						disabled={isLoading}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								loginButtonRef.current?.click()
							}
						}}
						{...register('password')}
					/>
					{errors?.password && (
						<p className="px-1 text-xs text-red-600">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="w-full flex flex-col">
					<Button
						ref={loginButtonRef}
						type="button"
						onClick={handleSubmit(onSubmit)}
					>
						Войти
					</Button>
				</div>
			</form>
		</div>
	)
}
