import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { cn } from '@/lib/utils'
import { useAuthStore, useLoginDialogStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const setShowLoginDialog = useLoginDialogStore(store => store.setShow)
	const passwordLabelRef = useRef<HTMLLabelElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)

	const login = useAuthStore(store => store.login)

	const navigate = useNavigate()

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

			setIsLoading(false)
			return
		}

		setIsLoading(false)

		toast({
			title: 'Авторизация прошла успешно',
			description: 'Функционал администратора разблокирован',
		})

		setShowLoginDialog(false)

		navigate(ERoutes.scaning)
	}

	return (
		<div className={cn(className)} {...props}>
			<form className="w-full flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Почта</Label>
					<Input
						id="email"
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
