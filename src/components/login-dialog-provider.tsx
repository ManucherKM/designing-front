import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useLoginDialogStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { UserAuthForm } from './user-auth-form'

export interface ILoginDialog {
	children: ReactNode
}

export const LoginDialogProvider: FC<ILoginDialog> = ({ children }) => {
	const open = useLoginDialogStore(store => store.isShow)
	const setShow = useLoginDialogStore(store => store.setShow)

	return (
		<>
			<Dialog open={open} onOpenChange={setShow}>
				<DialogContent className="sm:max-w-[425px] rounded-lg">
					<DialogHeader>
						<DialogTitle className="text-left">Вход в админку</DialogTitle>
						<DialogDescription className="text-justify !mt-3">
							Данный раздел разработан исключительно для администраторов
							сервиса. Если вы им не являетесь, настоятельно просим покинуть
							данный раздел.
						</DialogDescription>
					</DialogHeader>
					<UserAuthForm />
				</DialogContent>
			</Dialog>
			{children}
		</>
	)
}
